export const CITIZENSHIP_RECOMMENDATION = {
  name: "Citizenship Consultation",
  price: "Personalised review",
  why: "we review your eligibility route, timing and evidence priorities with you.",
  href: "/book-a-call",
} as const;

export function helpStatement(action: string) {
  return `We can help you ${action.charAt(0).toLowerCase()}${action.slice(1)}`;
}

export function recommendationFit(areas: string[], reason: string) {
  const priorities = areas.slice(0, 2).map((area) => area.toLowerCase());
  const priorityText = priorities.length === 0
    ? "Your answers suggest that preparation and presentation are now the main priorities."
    : `Your result highlights ${priorities.join(priorities.length === 2 ? " and " : "")} as ${priorities.length === 1 ? "a priority" : "priorities"}.`;
  return `${priorityText} ${reason.charAt(0).toUpperCase()}${reason.slice(1)}`;
}
