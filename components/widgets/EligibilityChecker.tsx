"use client";
import { useState } from "react";
import Link from "next/link";
import { QUESTIONS, verdict } from "@/lib/checker";
import { postLead, EMAIL_RE } from "@/lib/lead";
import { RichText } from "@/components/ui/RichText";

type Delivery = "idle" | "sending" | "sent" | "failed";
type State = { step: number; answers: number[]; email: string; emailError: boolean; emailStage: boolean; delivery: Delivery };

const INITIAL: State = { step: 0, answers: [], email: "", emailError: false, emailStage: true, delivery: "idle" };

export function EligibilityChecker() {
  const [s, setS] = useState<State>(INITIAL);
  const [emailInput, setEmailInput] = useState("");

  const total = QUESTIONS.length;
  const onOption = (i: number) => setS((prev) => ({ ...prev, answers: [...prev.answers, i], step: prev.step + 1 }));
  const onBack = () => setS((prev) => (prev.step === 0 ? prev : { ...prev, step: prev.step - 1, answers: prev.answers.slice(0, -1) }));
  const onShow = async () => {
    const v = emailInput.trim();
    if (!EMAIL_RE.test(v)) { setS((prev) => ({ ...prev, emailError: true })); return; }
    setS((prev) => ({ ...prev, email: v, emailError: false, emailStage: false, delivery: "sending" }));
    const r = verdict(s.answers);
    const delivered = await postLead({ source: "checker", email: v, answers: s.answers, outcome: r.v, pkg: r.p });
    setS((prev) => ({ ...prev, delivery: delivered ? "sent" : "failed" }));
  };
  const onSkip = () => setS((prev) => ({ ...prev, emailStage: false }));
  const onReset = () => { setS(INITIAL); setEmailInput(""); };

  return (
    <div className="bg-white text-navy-900 rounded-[22px] p-[30px] shadow-form grid gap-[18px]">
      <div className="flex gap-1.5" role="progressbar" aria-label="Eligibility questions answered" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(s.step, total)}>
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`flex-1 h-1.5 rounded-full ${i <= s.step ? "bg-navy-700" : "bg-line-soft"}`} />
        ))}
      </div>

      {s.step < total ? (
        <div>
          <p className="small">Question {s.step + 1} of {total} · Free eligibility snapshot</p>
          <h3 className="text-[24px] mt-1">{QUESTIONS[s.step].q}</h3>
          <div className="grid gap-2 mt-3.5">
            {QUESTIONS[s.step].options.map((o, i) => (
              <button key={o} type="button" onClick={() => onOption(i)}
                className="text-left font-medium text-[15.5px] min-h-[52px] px-4 py-3 border border-input-line rounded-btn bg-white hover:border-blue-200 hover:bg-line-soft transition-colors">
                {o}
              </button>
            ))}
          </div>
          {s.step > 0 && (
            <button type="button" onClick={onBack} className="text-[14px] text-slate-400 bg-transparent border-0 cursor-pointer p-0 mt-3 text-left">
              ← Back
            </button>
          )}
        </div>
      ) : s.emailStage ? (
        <div>
          <h3 className="text-[24px]">Where should we send it?</h3>
          <p className="small my-2">We will email your snapshot along with the document checklist for your pathway. No newsletter, no follow-up spam.</p>
          <input type="email" placeholder="you@example.com" aria-label="Email address" value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="[font:inherit] min-h-[52px] px-3.5 py-3 border border-input-line rounded-btn w-full" />
          {s.emailError && <p className="text-red text-[13.5px] mt-1.5">Please enter a valid email address.</p>}
          <div className="flex flex-wrap gap-3 items-center mt-3">
            <button type="button" onClick={onShow} className="btn btn-primary">Show my result</button>
            <button type="button" onClick={onSkip} className="text-[14px] text-slate-400 bg-transparent border-0 cursor-pointer underline">Skip and just show me</button>
          </div>
          <p className="fine mt-2.5">We use your email only to send this result and follow up once if you ask us to.</p>
        </div>
      ) : (
        <div aria-live="polite">
          {(() => {
            const r = verdict(s.answers);
            return (
              <>
                <p className="small">Your snapshot</p>
                <p className="font-display text-[27px] font-semibold tracking-[-.03em] leading-[1.15]">{r.v}</p>
                <p className="small mt-2.5">{r.b}</p>
                <p className="bg-line-soft rounded-chip px-3.5 py-3 text-[14.5px] mt-3.5">
                  <RichText value={`Suggested package: **${r.p}**`} />
                </p>
                {s.delivery === "sending" && (
                  <p className="bg-line-soft text-slate-500 rounded-chip px-3.5 py-2.5 text-[14px] font-medium mt-3" role="status">Sending your snapshot…</p>
                )}
                {s.delivery === "sent" && (
                  <p className="bg-green-bg text-green rounded-chip px-3.5 py-2.5 text-[14px] font-medium mt-3">✓ Submitted for delivery to {s.email}</p>
                )}
                {s.delivery === "failed" && (
                  <p className="bg-red-bg text-red rounded-chip px-3.5 py-2.5 text-[14px] font-medium mt-3" role="alert">We could not send the email. Your result is shown here, and you can still book a free call.</p>
                )}
                <p className="fine mt-2.5">A GetSGPR snapshot, not an ICA decision. No agency can promise an ICA outcome.</p>
                <div className="flex flex-wrap gap-3 items-center mt-3.5">
                  <Link href="/book-a-call" className="btn btn-primary">Book a free call</Link>
                  <button type="button" onClick={onReset} className="text-[14px] text-slate-400 bg-transparent border-0 cursor-pointer underline">Start over</button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
