"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { READINESS_QUESTIONS, assess, type ReadinessResult } from "@/lib/readiness";
import { postLead, EMAIL_RE } from "@/lib/lead";
import { PACKAGES } from "@/content/packages";

const GROUPS = [...new Set(READINESS_QUESTIONS.map((q) => q.group))];

export function ReadinessForm() {
  const [answers, setAnswers] = useState<(number | undefined)[]>(() => Array(READINESS_QUESTIONS.length).fill(undefined));
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReadinessResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const groupOn = useMemo(
    () => GROUPS.map((g) => READINESS_QUESTIONS.some((q, i) => q.group === g && answers[i] !== undefined)),
    [answers],
  );
  const answeredCount = answers.filter((answer) => answer !== undefined).length;

  const setAnswer = (qi: number, oi: number) =>
    setAnswers((prev) => { const next = [...prev]; next[qi] = oi; return next; });

  const q14 = answers[13];
  const q15Optional = q14 === 0 || q14 === 1;

  const onSubmit = () => {
    const missing = answers.some((a, i) => a === undefined && !(i === 14 && q15Optional));
    if (missing) { setError("Please answer every question above (question 15 may be left blank if you were never rejected)."); return; }
    if (!EMAIL_RE.test(email.trim())) { setError("Please enter a valid email address."); return; }
    if (!consent) { setError("Please agree to the consent statement so we can send your result."); return; }
    setError(null);
    const finalAnswers = answers.map((a) => a ?? 0);
    const r = assess(finalAnswers);
    setResult(r);
    void postLead({ source: "readiness", email: email.trim(), firstName: firstName.trim() || undefined, answers: finalAnswers, outcome: r.outcome, pkg: r.pkg.name });
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  };

  if (result) {
    const cta = PACKAGES.find((p) => p.slug === result.pkg.href)?.cta.label ?? "See packages";
    return (
      <div ref={resultRef} className="bg-white border border-line rounded-card p-[30px] max-w-[760px] grid gap-4 shadow-card">
        <h2 className="text-[27px]">Your PR readiness result: {result.outcome}</h2>
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
        <div>
          <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Recommended package</h4>
          <p className="text-[15px] text-slate-500">{result.pkg.name} · {result.pkg.price} · {result.pkg.why}</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Link href="/contact" className="btn btn-primary">Book a 20-minute strategy call</Link>
          <Link href={result.pkg.href} className="btn btn-ghost">{cta}</Link>
        </div>
        <p className="small">Message us on WhatsApp to schedule (scheduling only, no documents). This result is a GetSGPR diagnostic and not a prediction of ICA&apos;s decision. ICA assesses every application on its own merits.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-[24px] p-10 max-[640px]:p-5 max-w-[1040px] grid gap-8 shadow-form">
      <div className="grid gap-3 border-b border-line pb-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-navy-700">Your progress</p>
            <p className="mt-1 text-[14px] text-slate-500">Complete each group in order. You can change any answer.</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#edf1f8] px-3 py-1.5 text-[13px] font-semibold text-navy-900">{answeredCount} of 15</span>
        </div>
        <div className="flex gap-2" role="progressbar" aria-label="Questionnaire progress" aria-valuemin={0} aria-valuemax={15} aria-valuenow={answeredCount}>
          {GROUPS.map((g, i) => <span key={g} className={`flex-1 h-2 rounded-full transition-colors ${groupOn[i] ? "bg-navy-700" : "bg-line-soft"}`} />)}
        </div>
      </div>
      {GROUPS.map((group, groupIndex) => {
        const groupQuestions = READINESS_QUESTIONS.map((q, qi) => ({ q, qi })).filter(({ q }) => q.group === group);
        const groupAnswered = groupQuestions.filter(({ qi }) => answers[qi] !== undefined).length;
        const groupName = group.replace(/^Group [A-D] — /, "");
        return (
        <fieldset key={group} className="grid gap-5 rounded-[18px] border border-line bg-paper-alt/55 p-6 max-[640px]:p-4">
          <legend className="sr-only">{group}</legend>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-navy-900 text-[13px] font-semibold text-white">{String(groupIndex + 1).padStart(2, "0")}</span>
              <div><p className="text-[11px] font-semibold uppercase tracking-[.12em] text-slate-400">Group {String.fromCharCode(65 + groupIndex)}</p><h3 className="text-[21px]">{groupName}</h3></div>
            </div>
            <span className="text-[13px] font-medium text-slate-500">{groupAnswered}/{groupQuestions.length} answered</span>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[820px]:grid-cols-1">
          {groupQuestions.map(({ q, qi }) => (
            <div key={q.q} className="grid content-start gap-3 rounded-xl border border-line bg-white p-5 min-h-[150px] max-[640px]:min-h-0 max-[640px]:p-4">
              <label className="font-semibold text-[15px] leading-snug text-navy-900">{q.q}</label>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o, oi) => (
                  <button key={o} type="button" onClick={() => setAnswer(qi, oi)}
                    aria-pressed={answers[qi] === oi}
                    className={`border rounded-full px-4 py-2.5 text-[14px] font-medium min-h-[44px] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-700 ${answers[qi] === oi ? "bg-navy-700 text-on-dark border-navy-700 shadow-sm" : "bg-white text-navy-900 border-input-line hover:border-navy-700 hover:bg-[#f7f9fc]"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
          </div>
        </fieldset>
      )})}
      <div className="rounded-[18px] bg-navy-900 p-7 max-[640px]:p-5 text-white">
      <h3 className="text-[23px] text-white mb-2">Where should we send your result?</h3>
      <p className="text-[14px] text-white/70 mb-5">Enter your details after answering all 15 questions.</p>
      <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-4">
        <div className="grid gap-1.5">
          <label className="font-semibold text-[14px] text-white">First name</label>
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 border border-white/20 bg-white text-navy-900 rounded-btn w-full" />
        </div>
        <div className="grid gap-1.5">
          <label className="font-semibold text-[14px] text-white">Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 border border-white/20 bg-white text-navy-900 rounded-btn w-full" />
          <span className="text-[13px] text-white/60">We use your email to send your result and follow-up guidance.</span>
        </div>
      </div>
      <label className="flex gap-3 items-start text-[14px] leading-relaxed text-white/75 mt-5">
        <input type="checkbox" className="mt-1 size-4 accent-blue-300" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I agree to GetSGPR storing my answers and contacting me about my PR readiness result. <Link className="text-white underline" href="/privacy-data-security">Privacy policy</Link></span>
      </label>
      {error && <p role="alert" className="mt-4 rounded-lg bg-white/10 p-3 text-[13.5px] text-white">{error}</p>}
      <div className="mt-5"><button type="button" onClick={onSubmit} className="btn btn-light">See my result</button></div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-white/60">No NRIC, FIN, passport numbers or documents are requested at this stage.</p>
      </div>
    </div>
  );
}
