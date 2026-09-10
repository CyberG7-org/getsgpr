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

const ACTION_PRIORITIES: Array<[string, string]> = [
  ["employment letter", "Current employment evidence"],
  ["reconcile", "Cross-document alignment"],
  ["community involvement", "Recent community evidence"],
  ["residence record", "Residence track record"],
  ["changed since", "Evidence of material changes"],
  ["document checklist", "Document organisation"],
  ["cover letter", "Application narrative"],
  ["eligibility route", "Eligibility route and timing"],
  ["legal, financial or disclosure", "Disclosure preparation"],
  ["economic circumstances", "Economic evidence"],
  ["household's citizenship plan", "Family status and timing"],
  ["residence continuity", "Residence evidence"],
  ["renunciation", "Citizenship commitment planning"],
  ["evidence list", "Evidence planning"],
  ["concise account", "Application narrative"],
];

const PACKAGE_PRIORITIES: Record<string, string[]> = {
  "SGPR Lite": ["Self-guided document preparation", "Application timing"],
  "SGPR Partnered": ["Evidence pressure-testing", "Application consistency"],
  "Premium Concierge": ["Case strategy", "Narrative and evidence management"],
  "Citizenship Consultation": ["Eligibility and timing review", "Citizenship evidence strategy"],
};

export function presentationAreas(strong: string[], weak: string[], actions: string[], packageName: string) {
  const visibleStrong = strong.slice(0, 4);
  const actionPriorities = actions.flatMap((action) => {
    const match = ACTION_PRIORITIES.find(([phrase]) => action.toLowerCase().includes(phrase));
    return match ? [match[1]] : [];
  });
  const candidates = [
    ...weak,
    ...actionPriorities,
    ...(PACKAGE_PRIORITIES[packageName] ?? []),
    "Evidence presentation",
    "Final application readiness review",
  ];
  const visibleWeak = [...new Set(candidates)].slice(0, Math.max(visibleStrong.length + 1, 4));
  return { visibleStrong, visibleWeak };
}
