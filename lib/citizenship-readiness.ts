import type { Outcome } from "@/lib/readiness";
import { NATIONALITIES } from "@/lib/nationalities";

export type CitizenshipReadinessResult = {
  outcome: Outcome;
  intro: string;
  strong: string[];
  weak: string[];
  actions: string[];
};

export const CITIZENSHIP_QUESTIONS = [
  { group: "Group A — Eligibility and background", q: "1. What is your nationality?", options: NATIONALITIES, select: true },
  { group: "Group A — Eligibility and background", q: "2. How long have you held Singapore Permanent Residence?", options: ["Less than 2 years", "2–4 years", "5–9 years", "10 years or more"] },
  { group: "Group A — Eligibility and background", q: "3. What best describes your current citizenship status?", options: ["I hold one non-Singapore citizenship", "I hold more than one citizenship", "I prefer to discuss this privately"] },
  { group: "Group A — Eligibility and background", q: "4. What is your age band?", options: ["Under 21", "21–35", "36–50", "Over 50"] },
  { group: "Group A — Eligibility and background", q: "5. What is your highest completed qualification?", options: ["Secondary or other", "Diploma or technical qualification", "University degree", "Postgraduate or professional qualification"] },
  { group: "Group A — Eligibility and background", q: "6. Are there any legal, financial or disclosure matters that may need an explanation?", options: ["No known matters", "Yes", "Not sure"] },
  { group: "Group B — Economic record", q: "7. What is your approximate annual gross personal income?", options: ["Below S$40,000", "S$40,000–79,999", "S$80,000–150,000", "Above S$150,000", "Variable or not applicable"] },
  { group: "Group B — Economic record", q: "8. How consistent have your CPF contributions been during your PR period?", options: ["Consistent", "Some explainable gaps", "Irregular or not sure", "Not applicable to my circumstances"] },
  { group: "Group B — Economic record", q: "9. What is your current work situation?", options: ["Employed full-time", "Business owner or self-employed", "Part-time or variable work", "Not currently employed, retired or caregiving"] },
  { group: "Group B — Economic record", q: "10. Which best describes your field of work?", options: ["Private-sector professional or technical work", "Public service, education, healthcare or social service", "Business owner or entrepreneur", "Other"] },
  { group: "Group C — Family and Singapore ties", q: "11. What is your marital status?", options: ["Single", "Married", "Divorced or widowed"] },
  { group: "Group C — Family and Singapore ties", q: "12. What is your spouse's current status?", options: ["Not applicable", "Singapore citizen", "Singapore PR", "Other status"] },
  { group: "Group C — Family and Singapore ties", q: "13. Do you have children who are Singapore citizens?", options: ["Yes", "No", "Not applicable"] },
  { group: "Group C — Family and Singapore ties", q: "14. Do you have male children who serve, have served or may become liable for National Service?", options: ["Yes", "No male children", "My children are not currently eligible", "Not sure"] },
  { group: "Group D — Commitment and timing", q: "15. How long have you lived in Singapore in total, including the period before PR?", options: ["Less than 5 years", "5–9 years", "10–20 years", "More than 20 years"] },
  { group: "Group D — Commitment and timing", q: "16. What is your current housing arrangement in Singapore?", options: ["I own my home", "I rent on a stable lease", "I live with family", "Other or changing arrangement"] },
  { group: "Group D — Commitment and timing", q: "17. What best describes your ongoing community involvement in Singapore?", options: ["Leadership or organising role", "Active volunteer or member", "Occasional participation", "None at present"] },
  { group: "Group D — Commitment and timing", q: "18. How prepared are you to renounce your current citizenship if your application is approved?", options: ["Prepared to renounce", "I need advice or more time", "Not prepared to renounce"] },
  { group: "Group D — Commitment and timing", q: "19. When are you considering applying for citizenship?", options: ["Within 6 months", "Within 6–12 months", "After one year", "Not sure yet"] },
] as const;

const INTRO: Record<Outcome, string> = {
  "Ready to Prepare": "Your answers suggest that the main work now is organising a clear, current record of your life and commitments in Singapore.",
  "Strengthen First": "Your answers identify areas that would benefit from time or clearer evidence before you prepare a citizenship application.",
  "More Information Needed": "Your circumstances need a conversation before a useful readiness view can be given. A short form cannot resolve every eligibility or disclosure question.",
};

export function assessCitizenship(answers: number[]): CitizenshipReadinessResult {
  // answers[0] is nationality: collected for follow-up only and never scored.
  const a = answers.slice(1);
  const strong: string[] = [];
  const weak: string[] = [];
  const actions: string[] = [];

  if (a[0] >= 2) strong.push("Established PR history");
  else if (a[0] === 0) weak.push("PR qualifying period");
  if (a[6] === 0) strong.push("Consistent economic record");
  else if (a[6] === 2) weak.push("Economic record consistency");
  if (a[10] === 1 || a[11] === 0) strong.push("Immediate family ties to Singapore");
  if (a[13] >= 2) strong.push("Long residence in Singapore");
  else if (a[13] === 0) weak.push("Length of residence");
  if (a[14] <= 1) strong.push("Established housing in Singapore");
  if (a[15] <= 1) strong.push("Ongoing community involvement");
  else if (a[15] === 3) weak.push("Community involvement evidence");
  if (a[16] === 0) strong.push("Readiness for citizenship commitment");
  else if (a[16] === 2) weak.push("Readiness to renounce current citizenship");

  const needsPerson = a[1] === 2 || a[2] === 0 || a[4] >= 1 || a[5] === 4 || a[7] >= 2 || a[12] === 3;
  const mustStrengthen = a[0] === 0 || a[16] === 2;
  let outcome: Outcome = "Ready to Prepare";
  if (needsPerson) outcome = "More Information Needed";
  else if (mustStrengthen || weak.length >= 3) outcome = "Strengthen First";

  if (a[0] === 0) actions.push("Confirm which ICA eligibility route applies and when you meet its qualifying period.");
  if (a[4] >= 1) actions.push("Discuss any legal, financial or disclosure matter before preparing the application.");
  if (a[6] >= 1) actions.push("Reconcile your CPF, employment and income records, and note any gaps that need a factual explanation.");
  if (a[7] >= 2) actions.push("Prepare a clear account of your current economic circumstances and the records available to support it.");
  if (a[10] > 1 && a[11] !== 0) actions.push("Set out your household's citizenship plan so each family member's status and timing are clear.");
  if (a[13] === 0) actions.push("Organise evidence of residence continuity and the roots you have established in Singapore.");
  if (a[15] >= 2) actions.push("Document meaningful community involvement you already have, or build it naturally over time before applying.");
  if (a[16] >= 1) actions.push("Understand the practical consequences of renunciation before deciding when to apply.");
  actions.push("Build an evidence list covering your PR history, economic record, family ties and commitments in Singapore.");
  actions.push("Draft a concise account of what has changed and deepened since you became a Permanent Resident.");
  actions.push("Book a citizenship consultation to confirm eligibility, timing and the evidence that matters for your circumstances.");

  return { outcome, intro: INTRO[outcome], strong, weak, actions: actions.slice(0, 3) };
}
