import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";
import { REFUND_POLICY } from "@/content/packages";

export const privacy: PageContent = {
  meta: {
    title: "How GetSGPR Handles Your Documents | Privacy & Data Security",
    description: "A PR application means trusting us with your passport, your employment history and your family's records.",
    path: "/privacy-data-security",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "hero", variant: "plain",
      eyebrow: "Privacy and data security",
      title: "Your documents are sensitive. We treat them that way.",
      sub: "A PR application means trusting us with your passport, your employment history and your family's records. This page explains, in plain terms, what happens to them.",
    },
    { kind: "trust" },
    {
      kind: "items", columns: 3,
      title: "In one minute.",
      items: [
        { title: "Before you are a client", text: "Your free Readiness Review collects no documents and no identity numbers." },
        { title: "What the current policy covers", text: "The [published GetSGPR privacy policy](https://getsgpr.com/privacy-policy) covers identification, contact, employment, education, family, supporting-document and website data." },
        { title: "Where documents go", text: "Client documents go into a secure workspace, never into WhatsApp or personal inboxes." },
        { title: "Who can see them", text: "Only the people on your case can open your files. Access ends when the case closes." },
        { title: "How long we keep them", text: "We keep your files for [[x months]] after your outcome, then delete them." },
        { title: "Where they are stored", text: "Your data is stored in [[Singapore / locations]], with [[named safeguards]] for any overseas processing." },
        { title: "Who to ask", text: "[[Name]] is our data protection contact: [[email]]." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What we collect before you become a client, and what we do not.",
      content: [
        { p: "The Readiness Review asks for ranges and categories: age band, salary band, years in Singapore, pass type. It asks for your first name and email so we can send your result. It does not ask for your NRIC, FIN, passport number, employer name or any document. A strategy call is a conversation; we may take notes, but we do not ask you to send files." },
        { p: "The [current GetSGPR privacy policy](https://getsgpr.com/privacy-policy) says personal data may be used to provide consultancy services, prepare applications, communicate about services, process payments and receipts, and comply with Singapore law. It also states that personal data is not sold or rented to third parties." },
        { p: "**If someone claiming to be from GetSGPR asks for documents over WhatsApp or email before you have signed an engagement, do not send them, and tell us.**" },
      ],
    },
    {
      kind: "items", columns: 2,
      title: "How client documents are handled.",
      items: [
        { title: "Which systems receive what", text: "Lead and contact details are held in [[CRM]]. Applicant documents are held only in [[secure workspace / portal]]. Email and messaging are used for scheduling and questions, not for documents." },
        { title: "Where data is stored and processed", text: "[[Hosting locations per system.]] [[If any processing occurs outside Singapore, name the safeguard: contractual clauses, vendor certifications, or equivalent, as required by PDPA's Transfer Limitation Obligation.]]" },
        { title: "Who can see your files", text: "Your consultant, your case manager and the reviewer who checks the application before submission. Nobody else. Access is logged." },
        { title: "Encryption", text: "In transit and at rest on [[systems]]." },
        { title: "When your case closes", text: "Access for the team is revoked within [[x]] working days. You retain access to your own copies for [[x days]] to download." },
        { title: "Retention and deletion", text: "Files are retained for [[x months]] after the outcome, to support any appeal or reapplication, then deleted. You can ask for earlier deletion at any time, subject to our legal obligations." },
        { title: "Our vendors", text: "[[List of processors: workspace, video calls, CRM, email, booking.]] Each is bound by a written agreement covering security and confidentiality." },
        { title: "If something goes wrong", text: "[[Name]] is responsible for breach response. Affected clients are told promptly and, where required, PDPC is notified." },
      ],
    },
    {
      kind: "text", tone: "alt",
      title: "When we ask to share your story.",
      paragraphs: [
        "We publish reviews, videos and redacted outcome documents only with your written consent, which states where they appear and for how long. You can withdraw consent at any time and the material comes down within [[5]] working days. We redact identity numbers, addresses, reference numbers, dates of birth and unrelated family details from every image before it is published.",
      ],
    },
    {
      kind: "prose",
      title: "Your rights.",
      content: [
        { p: "Under Singapore's Personal Data Protection Act you may ask us what personal data we hold about you, how it has been used, and to correct it. You may withdraw consent to our use of your data, subject to the consequences we will explain, such as being unable to continue your case. Write to [[DPO name]] at [[email]] and we will respond within [[x]] days." },
        { h3: "Data protection contact" },
        { p: `[[DPO name]] · [[Email]] · +65 8934 0818 · ${SITE.address}` },
        { p: "We do not transfer personal data outside Singapore." },
        { p: "We retain personal data only as long as necessary for service delivery, legal, or business purposes." },
      ],
    },
    {
      kind: "prose", tone: "alt", id: "terms",
      title: "Terms of use",
      content: [
        { p: "These terms apply to the use of this website and to consultancy services provided by SGPR Immigration Singapore (UEN 53408306D)." },
        { p: "Fees are communicated before service engagement. " + REFUND_POLICY },
        { p: "GetSGPR does not guarantee any immigration outcome. ICA assesses every application on its own merits and makes all final decisions." },
        { p: "These Terms are governed by the laws of the Republic of Singapore. Disputes shall be resolved under the exclusive jurisdiction of the Singapore courts." },
        { small: "Current GetSGPR terms reviewed 3 September 2026." },
      ],
    },
  ],
};
