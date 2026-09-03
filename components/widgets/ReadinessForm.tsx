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
    <div className="bg-white border border-line rounded-card p-[30px] max-w-[760px] grid gap-[18px] shadow-form">
      <div className="flex gap-1.5">
        {GROUPS.map((g, i) => <span key={g} className={`flex-1 h-1.5 rounded-full ${groupOn[i] ? "bg-navy-700" : "bg-line-soft"}`} />)}
      </div>
      {GROUPS.map((group) => (
        <div key={group} className="grid gap-[18px]">
          <h3 className="text-[20px]">{group}</h3>
          {READINESS_QUESTIONS.map((q, qi) => q.group !== group ? null : (
            <div key={q.q} className="grid gap-1.5">
              <label className="font-semibold text-[15px] text-navy-900">{q.q}</label>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o, oi) => (
                  <button key={o} type="button" onClick={() => setAnswer(qi, oi)}
                    className={`border rounded-full px-4 py-2.5 text-[14.5px] font-medium min-h-[44px] cursor-pointer ${answers[qi] === oi ? "bg-navy-700 text-on-dark border-navy-700" : "bg-white text-navy-900 border-input-line"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <h3 className="text-[20px]">Where should we send your result?</h3>
      <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-4">
        <div className="grid gap-1.5">
          <label className="font-semibold text-[15px] text-navy-900">First name</label>
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 border border-input-line rounded-btn w-full" />
        </div>
        <div className="grid gap-1.5">
          <label className="font-semibold text-[15px] text-navy-900">Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 border border-input-line rounded-btn w-full" />
          <span className="text-[13px] text-slate-400">We use your email to send your result and follow-up guidance. No spam, and you can unsubscribe in one click.</span>
        </div>
      </div>
      <label className="flex gap-2.5 items-start text-[14.5px] text-slate-500">
        <input type="checkbox" className="mt-1" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        I agree to GetSGPR storing my answers and contacting me about my PR readiness result. <Link href="/privacy-data-security">Privacy policy</Link>
      </label>
      {error && <p className="text-red text-[13.5px]">{error}</p>}
      <div><button type="button" onClick={onSubmit} className="btn btn-primary">See my result</button></div>
      <p className="small">We do not ask for your NRIC, FIN, passport or documents at this stage, and we never will over email or WhatsApp.</p>
    </div>
  );
}
