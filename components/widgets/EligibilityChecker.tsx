"use client";
import { useState } from "react";
import Link from "next/link";
import { QUESTIONS, nextChecker, verdict } from "@/lib/checker";
import { READINESS_QUESTIONS } from "@/lib/readiness";
import { CITIZENSHIP_QUESTIONS } from "@/lib/citizenship-readiness";

const DETAILED_RESULT = ["Strong areas", "Areas to strengthen", "How we can help", "Recommended package"];

export function EligibilityChecker() {
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;

  const total = QUESTIONS.length;
  const onOption = (i: number) => setAnswers((prev) => [...prev, i]);
  const onBack = () => setAnswers((prev) => prev.slice(0, -1));
  const onReset = () => setAnswers([]);

  return (
    <div className="bg-white text-navy-900 rounded-[22px] p-[30px] shadow-form grid gap-[18px]">
      <div className="flex gap-1.5" role="progressbar" aria-label="Eligibility questions answered" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(step, total)}>
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`flex-1 h-1.5 rounded-full ${i <= step ? "bg-navy-700" : "bg-line-soft"}`} />
        ))}
      </div>

      {step < total ? (
        <div>
          <p className="small">Question {step + 1} of {total} · Free eligibility snapshot</p>
          <h3 className="text-[24px] mt-1">{QUESTIONS[step].q}</h3>
          <div className="grid gap-2 mt-3.5">
            {QUESTIONS[step].options.map((o, i) => (
              <button key={o} type="button" onClick={() => onOption(i)}
                className="text-left font-medium text-[15.5px] min-h-[52px] px-4 py-3 border border-input-line rounded-btn bg-white hover:border-blue-200 hover:bg-line-soft transition-colors">
                {o}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" onClick={onBack} className="text-[14px] text-slate-400 bg-transparent border-0 cursor-pointer p-0 mt-3 text-left">
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div aria-live="polite">
          {(() => {
            const r = verdict(answers);
            const next = nextChecker(answers);
            const count = next.kind === "citizenship" ? CITIZENSHIP_QUESTIONS.length : READINESS_QUESTIONS.length;
            return (
              <>
                <p className="small">Your snapshot</p>
                <p className="font-display text-[25px] font-semibold tracking-[-.03em] leading-[1.15]">{r.v}</p>
                <div className="bg-line-soft rounded-[14px] px-4 py-3.5 mt-3.5">
                  <p className="font-semibold text-[16px]">Get your detailed result</p>
                  <p className="small mt-0.5">Complete the free {count}-question {next.label} (about 10 minutes) to see your:</p>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2.5 text-[14.5px] font-medium max-[420px]:grid-cols-1">
                    {DETAILED_RESULT.map((item) => (
                      <li key={item} className="flex items-center gap-2"><span aria-hidden="true" className="text-navy-700">✓</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 items-center mt-3.5">
                  <Link href={next.href} className="btn btn-primary">Start the {next.label}</Link>
                  <button type="button" onClick={onReset} className="text-[14px] text-slate-400 bg-transparent border-0 cursor-pointer underline">Start over</button>
                </div>
                <p className="fine mt-2.5">A GetSGPR snapshot, not an ICA decision. No agency can promise an ICA outcome.</p>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
