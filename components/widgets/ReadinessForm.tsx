"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { READINESS_QUESTIONS, assess, type ReadinessResult } from "@/lib/readiness";
import { CITIZENSHIP_QUESTIONS, assessCitizenship, type CitizenshipReadinessResult } from "@/lib/citizenship-readiness";
import { postLead, EMAIL_RE } from "@/lib/lead";
import { PACKAGES } from "@/content/packages";

type Mode = "pr" | "citizenship";
type FormResult = ReadinessResult | CitizenshipReadinessResult;

function isPrResult(result: FormResult): result is ReadinessResult {
  return "pkg" in result;
}

export function ReadinessForm({ mode = "pr" }: { mode?: Mode }) {
  const questions = mode === "citizenship" ? CITIZENSHIP_QUESTIONS : READINESS_QUESTIONS;
  const groups = useMemo(() => [...new Set(questions.map((q) => q.group))], [questions]);
  const label = mode === "citizenship" ? "citizenship" : "PR";
  const [answers, setAnswers] = useState<(number | undefined)[]>(() => Array(questions.length).fill(undefined));
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FormResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = answers.filter((answer) => answer !== undefined).length;

  const setAnswer = (qi: number, oi: number) =>
    setAnswers((prev) => { const next = [...prev]; next[qi] = oi; return next; });

  const q14 = answers[13];
  const q15Optional = mode === "pr" && (q14 === 0 || q14 === 1);

  const onSubmit = () => {
    const missing = answers.some((a, i) => a === undefined && !(i === 14 && q15Optional));
    if (missing) { setError(mode === "pr" ? "Please answer every question above (question 15 may be left blank if you were never rejected)." : "Please answer every question above."); return; }
    if (!EMAIL_RE.test(email.trim())) { setError("Please enter a valid email address."); return; }
    if (!consent) { setError("Please agree to the consent statement so we can send your result."); return; }
    setError(null);
    const finalAnswers = answers.map((a) => a ?? 0);
    const r = mode === "citizenship" ? assessCitizenship(finalAnswers) : assess(finalAnswers);
    setResult(r);
    void postLead({ source: mode === "citizenship" ? "citizenship-readiness" : "readiness", email: email.trim(), firstName: firstName.trim() || undefined, answers: finalAnswers, outcome: r.outcome, pkg: isPrResult(r) ? r.pkg.name : "Citizenship consultation" });
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  };

  if (result) {
    const cta = isPrResult(result) ? PACKAGES.find((p) => p.slug === result.pkg.href)?.cta.label ?? "See packages" : null;
    return (
      <div ref={resultRef} className="bg-white border border-line rounded-card p-[30px] max-w-[760px] grid gap-4 shadow-card">
        <h2 className="text-[27px]">Your {label} readiness result: {result.outcome}</h2>
        <p className="lead">{result.intro}</p>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-5">
          <div>
            <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Strong areas</h4>
            <ul className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-disc">
              {result.strong.length ? result.strong.map((s) => <li key={s}>{s}</li>) : <li>None stood out from your answers.</li>}
            </ul>
          </div>
          <div>
            <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Areas to strengthen</h4>
            <ul className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-disc">
              {result.weak.length ? result.weak.map((w) => <li key={w}>{w}</li>) : <li>None stood out from your answers.</li>}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Your three next actions</h4>
          <ol className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-decimal">
            {result.actions.map((a) => <li key={a}>{a}</li>)}
          </ol>
        </div>
        {isPrResult(result) && <div>
          <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Recommended package</h4>
          <p className="text-[15px] text-slate-500">{result.pkg.name} · {result.pkg.price} · {result.pkg.why}</p>
        </div>}
        <div className="flex flex-wrap gap-3 items-center">
          <Link href="/book-a-call" className="btn btn-primary">Book a {mode === "citizenship" ? "citizenship consultation" : "20-minute strategy call"}</Link>
          {isPrResult(result) && <Link href={result.pkg.href} className="btn btn-ghost">{cta}</Link>}
        </div>
        <p className="small">This result is a GetSGPR preparation diagnostic. It is not an ICA score or a prediction of ICA&apos;s decision. ICA assesses every application on its own merits.</p>
      </div>
    );
  }

  const completion = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="readiness-form max-w-[1080px] rounded-[28px] border p-10 max-[640px]:rounded-[20px] max-[640px]:p-4" data-mode={mode}>
      <div className="readiness-progress-panel grid gap-5 rounded-[20px] p-7 text-white max-[640px]:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[.14em] text-white/65">Your readiness assessment</p>
            <h3 className="mt-1 text-[24px] text-white">Complete four short sections</h3>
            <p className="mt-1 text-[14px] text-white/65">Choose the closest answer. You can change it at any time.</p>
          </div>
          <div className="grid size-[70px] shrink-0 place-items-center rounded-full border-4 border-white/15 bg-white/5 max-[480px]:size-[58px]">
            <span className="text-[15px] font-semibold text-white">{completion}%</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2.5" role="progressbar" aria-label="Questionnaire progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answeredCount}>
          {groups.map((g) => {
            const groupQuestions = questions.map((q, qi) => ({ q, qi })).filter(({ q }) => q.group === g);
            const completed = groupQuestions.filter(({ qi }) => answers[qi] !== undefined).length;
            return <span key={g} className="h-2 overflow-hidden rounded-full bg-white/12"><span className="readiness-progress-fill block h-full rounded-full transition-[width] duration-300" style={{ width: `${(completed / groupQuestions.length) * 100}%` }} /></span>;
          })}
        </div>
        <div className="grid grid-cols-4 gap-2.5 text-[11px] font-medium text-white/55 max-[640px]:hidden">
          {groups.map((g, i) => <span key={g}>{String(i + 1).padStart(2, "0")} · {g.replace(/^Group [A-Z] — /, "")}</span>)}
        </div>
      </div>
      <div className="mt-8 grid gap-7">
      {groups.map((group, groupIndex) => {
        const groupQuestions = questions.map((q, qi) => ({ q, qi })).filter(({ q }) => q.group === group);
        const groupAnswered = groupQuestions.filter(({ qi }) => answers[qi] !== undefined).length;
        const groupName = group.replace(/^Group [A-Z] — /, "");
        const groupComplete = groupAnswered === groupQuestions.length;
        return (
        <fieldset key={group} className="readiness-group grid gap-6 rounded-[22px] border p-7 max-[640px]:gap-5 max-[640px]:p-4">
          <legend className="sr-only">{group}</legend>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="readiness-group-number flex size-11 items-center justify-center rounded-[13px] text-[13px] font-bold">{groupComplete ? "✓" : String(groupIndex + 1).padStart(2, "0")}</span>
              <div><p className="text-[11px] font-semibold uppercase tracking-[.13em] text-slate-400">Section {String.fromCharCode(65 + groupIndex)}</p><h3 className="text-[22px]">{groupName}</h3></div>
            </div>
            <span className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${groupComplete ? "readiness-complete" : "bg-white text-slate-500"}`}>{groupComplete ? "Complete" : `${groupAnswered}/${groupQuestions.length} answered`}</span>
          </div>
          <div className="grid grid-cols-2 gap-5 max-[1050px]:grid-cols-1">
          {groupQuestions.map(({ q, qi }) => (
            <div key={q.q} className="readiness-question grid content-start gap-4 rounded-[16px] border p-5 max-[640px]:p-4">
              <div className="flex items-start gap-3">
                <span className="readiness-question-number mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold">{qi + 1}</span>
                <p className="font-semibold text-[15px] leading-snug text-navy-900">{q.q.replace(/^\d+\.\s*/, "")}</p>
              </div>
              <div className="flex flex-wrap gap-2.5 pl-10 max-[640px]:pl-0">
                {q.options.map((o, oi) => (
                  <button key={o} type="button" onClick={() => setAnswer(qi, oi)}
                    aria-pressed={answers[qi] === oi}
                    className={`readiness-option inline-flex min-h-[46px] items-center gap-2 rounded-[11px] border px-4 py-2.5 text-left text-[14px] font-medium transition-[border-color,background-color,transform,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 ${answers[qi] === oi ? "is-selected shadow-sm" : "text-navy-900 hover:-translate-y-0.5"}`}>
                    <span>{o}</span>{answers[qi] === oi && <span aria-hidden="true" className="ml-auto grid size-5 shrink-0 place-items-center rounded-full bg-current/10 text-[12px]">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
          </div>
        </fieldset>
      )})}
      </div>
      <div className="readiness-contact-panel rounded-[18px] p-7 text-white max-[640px]:p-5">
      <h3 className="text-[23px] text-white mb-2">Where should we send your result?</h3>
      <p className="text-[14px] text-white/70 mb-5">Enter your details after answering all {questions.length} questions.</p>
      <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-4">
        <div className="grid content-start gap-1.5">
          <label className="font-semibold text-[14px] text-white">First name</label>
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 border border-white/20 bg-white text-navy-900 rounded-btn w-full" />
        </div>
        <div className="grid content-start gap-1.5">
          <label className="font-semibold text-[14px] text-white">Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 border border-white/20 bg-white text-navy-900 rounded-btn w-full" />
          <span className="text-[13px] text-white/60">We use your email to send your result and follow-up guidance.</span>
        </div>
      </div>
      <label className="flex gap-3 items-start text-[14px] leading-relaxed text-white/75 mt-5">
        <input type="checkbox" className="mt-1 size-4 accent-blue-300" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I agree to GetSGPR storing my answers and contacting me about my {label} readiness result. <Link className="text-white underline" href="/privacy-data-security">Privacy policy</Link></span>
      </label>
      {error && <p role="alert" className="mt-4 rounded-lg bg-white/10 p-3 text-[13.5px] text-white">{error}</p>}
      <div className="mt-5"><button type="button" onClick={onSubmit} className="btn btn-light">See my result</button></div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-white/60">No NRIC, FIN, passport numbers or documents are requested at this stage.</p>
      </div>
    </div>
  );
}
