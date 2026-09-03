export const QUESTIONS = [
  { q: "What is your current status in Singapore?", options: ["Employment Pass", "S Pass / Work Permit", "Dependant's Pass or LTVP", "Already a PR"] },
  { q: "How long have you worked in Singapore?", options: ["Under 1 year", "1–2 years", "2–5 years", "More than 5 years"] },
  { q: "Are you applying alone or with family?", options: ["On my own", "With spouse", "With spouse and children"] },
  { q: "Have you applied before?", options: ["No, first application", "Yes, and it was rejected", "Yes, still pending"] },
  { q: "Monthly income range?", options: ["Below $4,000", "$4,000 – $6,000", "$6,000 – $10,000", "Above $10,000"] },
  { q: "When would you like to submit?", options: ["As soon as possible", "Within 6 months", "Just researching"] },
];

const CONCIERGE = { p: "Premium Concierge — S$1,997", href: "/sgpr-premium-concierge" };
const PARTNERED = { p: "SGPR Partnered — S$497", href: "/sgpr-partnered-do-with-you" };
const LITE = { p: "SGPR Lite — S$197", href: "/sgpr-lite-diy-tier" };

export function verdict(a: number[]) {
  if (a[3] === 1) return { v: "An appeal may be viable.", b: "A rejection is a decision on one application, not on you. What matters now is what has materially changed since you applied. We review the previous submission with you and advise on appeal or re-submission on the merits.", ...CONCIERGE };
  if (a[1] === 0) return { v: "Waiting is probably smarter.", b: "ICA weighs length of residence and a stable employment record. With under a year in Singapore, most applicants are better served building that record first. SGPR Lite gets your documents in order now, so you are ready when the time is right.", ...LITE };
  if (a[0] === 3) return { v: "You're on the citizenship path.", b: "Citizenship asks a different question from PR: not whether you could contribute, but whether you already belong here. We help you evidence that and time the application sensibly.", ...CONCIERGE };
  if (a[1] >= 2 && a[4] >= 2) return { v: "You're in a strong position.", b: "Tenure and income are two of the factors ICA says it considers, and yours look solid. The work now is making sure your evidence is current and consistent, and your application tells one clear story.", ...PARTNERED };
  if (a[2] === 2) return { v: "Worth a conversation.", b: "Family applications are one story told through several people's records. The extra work is keeping every date, address and relationship consistent. Premium Concierge gives your household one accountable case manager.", ...CONCIERGE };
  return { v: "Worth a conversation.", b: "Your answers do not point to an obvious yes or no, which is normal. A free call will tell you whether now is the right time and what to prepare.", ...PARTNERED };
}
