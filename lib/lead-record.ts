import { QUESTIONS, verdict } from "@/lib/checker";
import { READINESS_QUESTIONS, assess } from "@/lib/readiness";
import { CITIZENSHIP_QUESTIONS, assessCitizenship } from "@/lib/citizenship-readiness";
import { CITIZENSHIP_RECOMMENDATION, helpStatement, recommendationFit } from "@/lib/readiness-presentation";
import type { LeadSubmission } from "@/lib/lead";

type Question = { q: string; options: readonly string[] };

export type LeadAnswerRecord = {
  questionId: string;
  question: string;
  answerIndex: number;
  answer: string;
};

export type LeadRecord = {
  eventType: "eligibility_completed" | "readiness_completed";
  submissionId: string;
  schemaVersion: string;
  receivedAt: string;
  source: LeadSubmission["source"];
  checkerType: "Eligibility" | "PR readiness" | "Citizenship readiness";
  email: string;
  firstName: string;
  consentAt: string;
  bookingStatus: "Not started";
  bookingClickedAt: string;
  pageUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  outcome: string;
  resultSummary: string;
  recommendedPackage: string;
  recommendedPackagePrice: string;
  recommendedPackageReason: string;
  strongAreas: string[];
  strongAreasText: string;
  areasToStrengthen: string[];
  areasToStrengthenText: string;
  howWeCanHelp: string[];
  howWeCanHelpText: string;
  answers: LeadAnswerRecord[];
  answersJson: string;
  answersSummary: string;
};

const configurations = {
  checker: { questions: QUESTIONS, prefix: "eligibility", schemaVersion: "eligibility-v1", checkerType: "Eligibility" },
  readiness: { questions: READINESS_QUESTIONS, prefix: "pr", schemaVersion: "pr-readiness-v2", checkerType: "PR readiness" },
  "citizenship-readiness": { questions: CITIZENSHIP_QUESTIONS, prefix: "citizenship", schemaVersion: "citizenship-readiness-v2", checkerType: "Citizenship readiness" },
} as const;

export function questionsFor(source: LeadSubmission["source"]): readonly Question[] {
  return configurations[source].questions;
}

export function validAnswers(source: LeadSubmission["source"], answers: unknown): answers is number[] {
  const questions = questionsFor(source);
  return Array.isArray(answers)
    && answers.length === questions.length
    && answers.every((answer, index) => Number.isInteger(answer) && answer >= 0 && answer < questions[index].options.length);
}

function answerRecords(source: LeadSubmission["source"], answers: number[]) {
  const config = configurations[source];
  return config.questions.map((question, index) => ({
    questionId: `${config.prefix}-q${String(index + 1).padStart(2, "0")}`,
    question: question.q.replace(/^\d+\.\s*/, ""),
    answerIndex: answers[index],
    answer: question.options[answers[index]],
  }));
}

export function buildLeadRecord(lead: LeadSubmission, receivedAt: string, submissionId: string): LeadRecord {
  const config = configurations[lead.source];
  const answers = answerRecords(lead.source, lead.answers);
  let outcome: string;
  let resultSummary: string;
  let recommendedPackage: string;
  let recommendedPackagePrice = "";
  let recommendedPackageReason = "";
  let strongAreas: string[] = [];
  let areasToStrengthen: string[] = [];
  let howWeCanHelp: string[] = [];

  if (lead.source === "readiness") {
    const result = assess(lead.answers);
    outcome = result.outcome;
    resultSummary = result.intro;
    recommendedPackage = result.pkg.name;
    recommendedPackagePrice = result.pkg.price;
    recommendedPackageReason = recommendationFit(result.weak, result.pkg.why);
    strongAreas = result.strong;
    areasToStrengthen = result.weak;
    howWeCanHelp = result.actions.map(helpStatement);
  } else if (lead.source === "citizenship-readiness") {
    const result = assessCitizenship(lead.answers);
    outcome = result.outcome;
    resultSummary = result.intro;
    recommendedPackage = CITIZENSHIP_RECOMMENDATION.name;
    recommendedPackagePrice = CITIZENSHIP_RECOMMENDATION.price;
    recommendedPackageReason = recommendationFit(result.weak, CITIZENSHIP_RECOMMENDATION.why);
    strongAreas = result.strong;
    areasToStrengthen = result.weak;
    howWeCanHelp = result.actions.map(helpStatement);
  } else {
    const result = verdict(lead.answers);
    outcome = result.v;
    resultSummary = result.b;
    recommendedPackage = result.p;
  }

  return {
    eventType: lead.source === "checker" ? "eligibility_completed" : "readiness_completed",
    submissionId,
    schemaVersion: config.schemaVersion,
    receivedAt,
    source: lead.source,
    checkerType: config.checkerType,
    email: lead.email.trim().toLowerCase(),
    firstName: lead.firstName?.trim() ?? "",
    consentAt: lead.consent ? receivedAt : "",
    bookingStatus: "Not started",
    bookingClickedAt: "",
    pageUrl: lead.pageUrl ?? "",
    referrer: lead.referrer ?? "",
    utmSource: lead.utmSource ?? "",
    utmMedium: lead.utmMedium ?? "",
    utmCampaign: lead.utmCampaign ?? "",
    outcome,
    resultSummary,
    recommendedPackage,
    recommendedPackagePrice,
    recommendedPackageReason,
    strongAreas,
    strongAreasText: strongAreas.join(" | "),
    areasToStrengthen,
    areasToStrengthenText: areasToStrengthen.join(" | "),
    howWeCanHelp,
    howWeCanHelpText: howWeCanHelp.join(" | "),
    answers,
    answersJson: JSON.stringify(answers),
    answersSummary: answers.map((answer) => `${answer.questionId}: ${answer.answer}`).join(" | "),
  };
}
