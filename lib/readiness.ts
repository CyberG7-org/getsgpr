export type Outcome = "Ready to Prepare" | "Strengthen First" | "More Information Needed";
export type ReadinessResult = { outcome: Outcome; intro: string; strong: string[]; weak: string[]; actions: string[]; pkg: { name: string; price: string; why: string; href: string } };

export const READINESS_QUESTIONS = [
  { group: "Group A — Profile", q: "1. Which pass do you hold now?", options: ["Employment Pass", "S Pass", "Work Permit", "Dependant's Pass", "LTVP", "Student Pass", "Other"] },
  { group: "Group A — Profile", q: "2. What is your age band?", options: ["Under 25", "25–29", "30–34", "35–39", "40–44", "45–49", "50 and above"] },
  { group: "Group A — Profile", q: "3. What is your highest completed qualification?", options: ["Secondary", "Diploma", "Bachelor's", "Master's", "Doctorate", "Professional qualification"] },
  { group: "Group A — Profile", q: "4. Was that qualification obtained in Singapore?", options: ["Yes", "No"] },
  { group: "Group B — Residence and work", q: "5. How long have you lived in Singapore continuously?", options: ["Under 1 year", "1–2", "2–4", "4–6", "6–10", "Over 10 years"] },
  { group: "Group B — Residence and work", q: "6. How long have you been with your current employer or business?", options: ["Under 6 months", "6–12 months", "1–3 years", "Over 3 years"] },
  { group: "Group B — Residence and work", q: "7. What is your monthly salary band?", options: ["Under S$4,000", "S$4,000–6,999", "S$7,000–9,999", "S$10,000–14,999", "S$15,000 and above", "Self-employed, variable"] },
  { group: "Group B — Residence and work", q: "8. Are you employed or self-employed?", options: ["Employed", "Self-employed or business owner", "Both"] },
  { group: "Group C — Family and ties", q: "9. Are you married to, or the child or parent of, a Singapore citizen or PR?", options: ["Yes", "No"] },
  { group: "Group C — Family and ties", q: "10. Will family members be included in your application?", options: ["No", "Spouse", "Spouse and children", "Children only", "Parents"] },
  { group: "Group C — Family and ties", q: "11. Do you have Singapore-based evidence of community involvement, such as volunteering, associations or professional bodies?", options: ["Yes, within the last two years", "Yes, but older", "No"] },
  { group: "Group D — Evidence and timing", q: "12. Do you have an employment letter dated within the last month and six months of payslips?", options: ["Both", "One", "Neither"] },
  { group: "Group D — Evidence and timing", q: "13. Do the dates and job titles on your CV, payslips, CPF and employment letters all agree?", options: ["Yes", "Mostly", "Not sure", "Known differences"] },
  { group: "Group D — Evidence and timing", q: "14. Have you applied for Singapore PR before?", options: ["No", "Yes, withdrawn", "Yes, rejected once", "Yes, rejected more than once"] },
  { group: "Group D — Evidence and timing", q: "15. If rejected: what has materially changed since your last application?", options: ["New job or promotion", "Salary increase", "Marriage or child", "Longer residence", "New qualification", "Nothing significant", "Not sure"] },
];

const INTRO: Record<Outcome, string> = {
  "Ready to Prepare": "Based on your answers, your profile and evidence look ready to be assembled into an application. The work now is doing it well.",
  "Strengthen First": "Based on your answers, one or more factors would benefit from work before you apply. Doing that work first is usually better than applying and hoping.",
  "More Information Needed": "Your answers raise a question we cannot resolve without talking to you. That is not a bad sign; it means your situation needs a person, not a form.",
};

export function assess(a: number[]): ReadinessResult {
  const strong: string[] = [], weak: string[] = [], actions: string[] = [];
  const rejected = a[13] >= 2;
  // factor reads
  if (a[4] >= 3) strong.push("Residence continuity"); else if (a[4] === 0) weak.push("Residence continuity");
  if (a[5] >= 2) strong.push("Employment stability"); else if (a[5] === 0) weak.push("Employment stability");
  if (a[6] >= 2 && a[6] <= 4) strong.push("Economic contribution"); else if (a[6] === 0) weak.push("Economic contribution");
  if (a[2] >= 2) strong.push("Qualifications"); if (a[3] === 0) strong.push("Singapore qualification");
  if (a[8] === 0) strong.push("Family ties to Singapore");
  if (a[10] === 0) strong.push("Integration evidence"); else weak.push("Integration evidence");
  if (a[11] === 0) strong.push("Evidence currency"); else weak.push("Evidence currency");
  if (a[12] === 0) strong.push("Cross-document consistency"); else if (a[12] >= 2) weak.push("Cross-document consistency");
  if (rejected) weak.push("Previous rejection");

  let outcome: Outcome = "Ready to Prepare";
  const needsPerson = a[0] === 6 || a[6] === 5 || a[7] >= 1 || (rejected && a[14] === 6);
  const mustStrengthen = a[4] === 0 || a[11] === 2 || a[12] === 3 || (rejected && a[14] === 5) || a[5] === 0;
  if (needsPerson) outcome = "More Information Needed";
  else if (mustStrengthen || weak.length >= 3) outcome = "Strengthen First";

  if (a[11] !== 0) actions.push("Obtain an employment letter dated within the last month and gather six months of payslips.");
  if (a[12] !== 0) actions.push("Reconcile dates and job titles across your CV, payslips, CPF statements and employment letters.");
  if (a[10] !== 0) actions.push("Document Singapore-based community involvement from the last two years, or start it now.");
  if (a[4] === 0) actions.push("Build a longer, continuous residence record before you submit.");
  if (rejected) actions.push("Write down exactly what has changed since your last application and how you can evidence it.");
  actions.push("Assemble your evidence in the order of ICA's document checklist and date-stamp each item.");
  actions.push("Draft a one-page cover letter that tells one consistent story across every document.");
  actions.push("Book a free 20-minute call to confirm timing and the package that fits.");
  const three = actions.slice(0, 3);

  const pkg = (a[13] === 3 || (rejected && a[14] >= 5) || a[9] >= 2) ? { name: "Premium Concierge", price: "S$1,997", why: "your case needs one accountable case manager and the narrative written for you.", href: "/sgpr-premium-concierge" }
    : outcome === "Strengthen First" && weak.length <= 1 ? { name: "SGPR Lite", price: "S$197", why: "you can get your documents in order now and apply when the record is stronger.", href: "/sgpr-lite-diy-tier" }
    : { name: "SGPR Partnered", price: "S$497", why: "a consultant pressure-tests your evidence while you stay in control.", href: "/sgpr-partnered-do-with-you" };

  return { outcome, intro: INTRO[outcome], strong, weak, actions: three, pkg };
}
