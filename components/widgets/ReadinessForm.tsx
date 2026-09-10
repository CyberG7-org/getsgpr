"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { READINESS_QUESTIONS, assess, type ReadinessResult } from "@/lib/readiness";
import { CITIZENSHIP_QUESTIONS, assessCitizenship, type CitizenshipReadinessResult } from "@/lib/citizenship-readiness";
import { createSubmissionId, postBookingIntent, postLead, EMAIL_RE } from "@/lib/lead";
import { PACKAGES } from "@/content/packages";
import { ReadinessButton } from "@/components/ui/ReadinessButton";
import { CITIZENSHIP_RECOMMENDATION, helpStatement, presentationAreas } from "@/lib/readiness-presentation";

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
  const [submissionId, setSubmissionId] = useState<string | null>(null);
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
    const id = createSubmissionId();
    const packageName = isPrResult(r) ? r.pkg.name : CITIZENSHIP_RECOMMENDATION.name;
    setResult(r);
    setSubmissionId(id);
    try {
      sessionStorage.setItem("getsgpr-booking-context", JSON.stringify({
        submissionId: id,
        firstName: firstName.trim(),
        email: email.trim().toLowerCase(),
        checkerType: mode === "citizenship" ? "Citizenship readiness" : "PR readiness",
        recommendedPackage: packageName,
      }));
    } catch { /* Booking still works when browser storage is unavailable. */ }
    void postLead({
      source: mode === "citizenship" ? "citizenship-readiness" : "readiness",
      submissionId: id,
      email: email.trim(),
      firstName: firstName.trim() || undefined,
      answers: finalAnswers,
      consent: true,
    });
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  };

  if (result) {
    const cta = isPrResult(result) ? PACKAGES.find((p) => p.slug === result.pkg.href)?.cta.label ?? "See packages" : null;
    const recommendation = isPrResult(result)
      ? result.pkg
      : CITIZENSHIP_RECOMMENDATION;
    const { visibleStrong, visibleWeak } = presentationAreas(result.strong, result.weak, result.actions, recommendation.name);
    const bookingHref = submissionId ? `/book-a-call?rid=${encodeURIComponent(submissionId)}` : "/book-a-call";
    const trackBooking = () => {
      if (submissionId) void postBookingIntent(submissionId, email.trim());
    };
    return (
      <article ref={resultRef} className="readiness-result max-w-[1080px] scroll-mt-[110px] overflow-hidden rounded-[26px] border border-line bg-white shadow-card" data-mode={mode} aria-live="polite">
        <header className="readiness-result-header px-8 py-7 text-white max-[640px]:px-5 max-[640px]:py-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.15em] text-white/65">Your {label} readiness report</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[clamp(27px,4vw,38px)] text-white">{result.outcome}</h2>
            <span className="readiness-result-status rounded-full px-3.5 py-1.5 text-[12px] font-semibold">Personalised result</span>
          </div>
          <p className="mt-3 max-w-[72ch] text-[16px] leading-relaxed text-white/75">{result.intro}</p>
        </header>

        <div className="grid gap-6 p-8 max-[640px]:p-5">
          <section className="readiness-recommendation flex flex-wrap items-center justify-between gap-5 rounded-[18px] border px-5 py-5">
            <div className="max-w-[700px]">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[.13em]">Recommended package</p>
              <h3 className="text-[22px]">{recommendation.name}</h3>
              <p className="mt-1 text-[14px] leading-relaxed"><strong>{recommendation.price}</strong> · {recommendation.why}</p>
            </div>
            <ReadinessButton
              href={mode === "citizenship" ? bookingHref : recommendation.href}
              label={mode === "citizenship" ? "View consultation details" : cta ?? "View recommended package"}
              variant={mode}
              small
              onClick={mode === "citizenship" ? trackBooking : undefined}
            />
          </section>

          <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
          <section className="rounded-[16px] border border-[#cce8dc] bg-[#edf7f3] p-5">
            <div className="mb-3 flex items-center gap-2.5">
              <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-[#d4eee2] text-[13px] font-bold text-[#235c49]">✓</span>
              <h3 className="text-[17px] text-[#235c49]">Strong areas</h3>
            </div>
            <ul className="grid gap-2 pl-[19px] text-[15px] leading-relaxed text-[#235c49] list-disc">
              {visibleStrong.length ? visibleStrong.map((s) => <li key={s}>{s}</li>) : <li>None stood out from your answers.</li>}
            </ul>
          </section>
          <section className="rounded-[16px] border border-[#f1dfb7] bg-[#fff7e7] p-5">
            <div className="mb-3 flex items-center gap-2.5">
              <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-[#f6e7c5] text-[13px] font-bold text-[#795313]">!</span>
              <h3 className="text-[17px] text-[#795313]">Areas to strengthen</h3>
            </div>
            <ul className="grid gap-2 pl-[19px] text-[15px] leading-relaxed text-[#795313] list-disc">
              {visibleWeak.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </section>
          </div>

          <section className="rounded-[18px] border border-line bg-paper px-5 py-5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[.13em] text-slate-400">Guidance based on your answers</p>
            <h3 className="mb-4 text-[22px]">How we can help</h3>
            <ul className="grid gap-3">
              {result.actions.map((action, index) => (
                <li key={action} className="flex gap-3 text-[15px] leading-relaxed text-slate-500">
                  <span aria-hidden="true" className="readiness-help-number grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold">{index + 1}</span>
                  <span>{helpStatement(action)}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex justify-center">
            <ReadinessButton
              href={bookingHref}
              label={mode === "citizenship" ? "Book a citizenship consultation" : "Book a 20-minute strategy call"}
              variant={mode}
              onClick={trackBooking}
            />
          </div>

          <p className="small">This result is a GetSGPR preparation diagnostic. It is not an ICA score or a prediction of ICA&apos;s decision. ICA assesses every application on its own merits.</p>
        </div>
      </article>
    );
  }

  const completion = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="readiness-form max-w-[1080px] rounded-[28px] border p-10 backdrop-blur-2xl backdrop-saturate-150 max-[640px]:rounded-[20px] max-[640px]:p-4" data-mode={mode}>
      <div className="readiness-progress-panel grid gap-5 rounded-[20px] p-7 text-white backdrop-blur-lg backdrop-saturate-125 max-[640px]:p-5">
        <div className="flex flex-col items-center gap-4 text-center">
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
        <div className="grid grid-cols-4 gap-2.5 text-center text-[11px] font-medium text-white/55 max-[640px]:hidden">
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
        <fieldset key={group} className="readiness-group grid gap-6 rounded-[22px] border p-7 backdrop-blur-lg max-[640px]:gap-5 max-[640px]:p-4">
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
            <div key={q.q} className="readiness-question grid content-start gap-4 rounded-[16px] border p-5 backdrop-blur-md max-[640px]:p-4">
              <div className="flex items-start gap-3">
                <span className="readiness-question-number mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold">{qi + 1}</span>
                <p className="font-semibold text-[15px] leading-snug text-navy-900">{q.q.replace(/^\d+\.\s*/, "")}</p>
              </div>
              <div className="flex flex-wrap gap-2.5 pl-10 max-[640px]:pl-0">
                {q.options.map((o, oi) => (
                  <button key={o} type="button" onClick={() => setAnswer(qi, oi)}
                    aria-pressed={answers[qi] === oi}
                    className={`readiness-option inline-flex min-h-[46px] items-center gap-2 rounded-[11px] border px-4 py-2.5 text-left text-[14px] font-medium backdrop-blur-sm transition-[border-color,background-color,transform,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 ${answers[qi] === oi ? "is-selected shadow-sm" : "text-navy-900 hover:-translate-y-0.5"}`}>
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
      <div className="readiness-contact-panel rounded-[18px] p-7 text-center text-white backdrop-blur-lg backdrop-saturate-125 max-[640px]:p-5">
      <h3 className="text-[23px] text-white mb-2">Where should we send your result?</h3>
      <p className="text-[14px] text-white/70 mb-5">Enter your details after answering all {questions.length} questions.</p>
      <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-4">
        <div className="grid content-start gap-1.5">
          <label className="font-semibold text-[14px] text-white">First name</label>
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 text-center border border-white/20 bg-white text-navy-900 rounded-btn w-full" />
        </div>
        <div className="grid content-start gap-1.5">
          <label className="font-semibold text-[14px] text-white">Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 text-center border border-white/20 bg-white text-navy-900 rounded-btn w-full" />
          <span className="text-[13px] text-white/60">We use your email to send your result and follow-up guidance.</span>
        </div>
      </div>
      <label className="flex justify-center gap-3 items-start text-center text-[14px] leading-relaxed text-white/75 mt-5">
        <input type="checkbox" className="mt-1 size-4 accent-blue-300" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I agree to GetSGPR storing my answers and contacting me about my {label} readiness result. <Link className="text-white underline" href="/privacy-data-security">Privacy policy</Link></span>
      </label>
      {error && <p role="alert" className="mt-4 rounded-lg bg-white/10 p-3 text-[13.5px] text-white">{error}</p>}
      <div className="mt-5 flex justify-center"><button type="button" onClick={onSubmit} className="btn btn-light">See my result</button></div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-white/60">No NRIC, FIN, passport numbers or documents are requested at this stage.</p>
      </div>
    </div>
  );
}
