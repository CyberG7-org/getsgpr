export const CITIZENSHIP_RECOMMENDATION = {
  name: "Citizenship Consultation",
  price: "Personalised review",
  why: "we review your eligibility route, timing and evidence priorities with you.",
  href: "/book-a-call",
} as const;

export function helpStatement(action: string) {
  return `We can help you ${action.charAt(0).toLowerCase()}${action.slice(1)}`;
}
