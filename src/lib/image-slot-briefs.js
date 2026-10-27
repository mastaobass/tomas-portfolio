/**
 * Briefs for case-study images Tomás still has to make, plus the one
 * paper-wireframe frame already on the Rules engine page.
 *
 * Layout this is based on:
 *   --layout-measure: 744px reading column
 *   --layout-label-col: 160px
 *   --space-2xl: 4rem gap between label and column
 *   --space-md: 1rem gap inside a before/after pair
 *   --layout-gutter: clamp(1.25rem, 0.5rem + 4vw, 10rem)
 *   prose collapses to one column at max-width 860px
 *
 * At a 860px viewport the shell is one column about 775px wide after the
 * gutter. That is the widest an inline figure renders. Export width 1584
 * is the smallest width at or above 2x775 that keeps a whole-pixel height
 * for 16:9, 2:1, 16:10, 4:3, and 3:4.
 *
 * The build converts PNG and JPEG sources to WebP. AVIF is not enabled.
 * Edit a brief here, then run `node scripts/image-shot-list.mjs`.
 */

export const imagePresets = {
  screen: {
    label: "Full-width screen",
    ratio: "16 / 9",
    ratioLabel: "16:9",
    exportWidth: 1584,
    exportHeight: 891,
    format: "PNG",
    use: "A UI screen or hero in the reading column.",
  },
  diagram: {
    label: "Wide diagram",
    ratio: "2 / 1",
    ratioLabel: "2:1",
    exportWidth: 1584,
    exportHeight: 792,
    format: "PNG",
    use: "A diagram that needs a wide stage. 2:1 stays tall enough to read in the 744px column. 21:9 would be shorter than the labels need.",
  },
  pair: {
    label: "Before/after pair",
    ratio: "16 / 10",
    ratioLabel: "16:10",
    exportWidth: 1584,
    exportHeight: 990,
    format: "PNG",
    use: "Two matching screens. From 861px up they share the 744px column with a 16px gap, about 364px each. Below that they stack, so export at the full-column size.",
  },
  detail: {
    label: "Detail crop",
    ratio: "4 / 3",
    ratioLabel: "4:3",
    exportWidth: 1584,
    exportHeight: 1188,
    format: "PNG",
    use: "A crop, a physical object, or a single artifact that needs more height than a screen.",
  },
  sketch: {
    label: "Portrait sketch",
    ratio: "3 / 4",
    ratioLabel: "3:4",
    exportWidth: 1584,
    exportHeight: 2112,
    format: "PNG",
    use: "Paper, a patent plate, or another portrait drawing. Matches the 3:4 frames already used for wireframes and research boards.",
  },
  phone: {
    label: "Tall mobile",
    ratio: "9 / 19.5",
    ratioLabel: "9:19.5",
    exportWidth: 720,
    exportHeight: 1560,
    limitWidth: 360,
    format: "PNG",
    use: "A phone screen, capped at 360px wide so it does not stretch across the column. No current study uses it.",
  },
};

export const imageSlots = [
  {
    id: "trust-opaque-score",
    study: "Trust score explainability",
    studyId: "trust-score-explainability",
    section: "Constraint",
    preset: "screen",
    label: "Opaque score",
    description:
      "The score as the analyst saw it before the explainer: a number on the decision, with no factors. It proves the opacity the rest of the study is answering.",
    alt: "The review decision showing only a trust score, with no contributing factors on the screen.",
    caption: "The decision was a number. The factors were not on the screen.",
    path: "",
    status: "empty",
  },
  {
    id: "trust-escalation",
    study: "Trust score explainability",
    studyId: "trust-score-explainability",
    section: "Constraint",
    preset: "diagram",
    label: "Escalation",
    description:
      "The old path from a merchant challenge to engineering, when the analyst only had the number. It proves why a score they could not explain made manual review feel safer.",
    alt: "Diagram of a merchant challenge going to an analyst who only has the score, then on to engineering.",
    caption: "A challenge left the analyst with the number, and the dispute went to engineering.",
    path: "",
    status: "empty",
  },
  {
    id: "trust-feedback-control",
    study: "Trust score explainability",
    studyId: "trust-score-explainability",
    section: "Keep absence visible",
    preset: "detail",
    label: "Feedback",
    description:
      "A crop of the footer control that flags an explanation which does not hold up. It proves the dead end was removed: the flag goes to the risk team as reason-code tuning.",
    alt: "Footer control used to flag a trust score explanation that does not hold up.",
    caption: "A weak explanation can be flagged. That flag is how reason codes get tuned.",
    path: "",
    status: "empty",
  },
  {
    id: "rules-and-only-before",
    study: "Rules engine",
    studyId: "rules-engine",
    section: "Make OR legible",
    preset: "pair",
    label: "Before",
    description:
      "The old editor: a flat rule list where conditions could only combine with AND. It proves why policies that needed OR became workarounds.",
    alt: "The previous rule editor, a flat list of conditions that can only be combined with AND.",
    caption: "Conditions could only combine with AND. OR policies turned into workarounds.",
    path: "",
    status: "empty",
  },
  {
    id: "rules-nested-editor",
    study: "Rules engine",
    studyId: "rules-engine",
    section: "Make OR legible",
    preset: "pair",
    label: "After",
    description:
      "The shipped editor with nested AND and OR groups. This is the real product screen, not the paper wireframe under it and not a deck sketch of the UI. It proves an analyst can re-read the boolean logic in the tool.",
    alt: "The shipped rule editor with nested groups of AND and OR conditions.",
    caption: "Nested AND and OR groups, in the shipped editor.",
    path: "",
    status: "empty",
  },
  {
    id: "rules-paper-wireframes",
    study: "Rules engine",
    studyId: "rules-engine",
    section: "Make OR legible",
    preset: "sketch",
    label: "Paper sketches",
    description:
      "Hand-drawn sheets working out OR logic and nested structure before a polished screen. Already published on this page. A redraw should still show that the evaluation model came first.",
    alt: "Hand-drawn paper wireframes exploring OR logic and nested policy structure",
    caption:
      "Early structure work for OR logic. The evaluation model had to be right before the UI was worth polishing.",
    path: "rules-paper-wireframes.png",
    status: "filled",
  },
  {
    id: "rules-engines-merge",
    study: "Rules engine",
    studyId: "rules-engine",
    section: "Replace triggers with segments",
    preset: "diagram",
    label: "Two engines",
    description:
      "One wide diagram with both states: the two policy engines side by side, and the single engine they became, covering Login, New Account Opening, and Payments Fraud. It proves the move was a merge, not only a rename from triggers to segments.",
    alt: "Diagram showing two separate policy engines and the single engine they merged into.",
    caption: "Two policy engines, and the one surface they became.",
    path: "",
    status: "empty",
  },
  {
    id: "rules-compare-published",
    study: "Rules engine",
    studyId: "rules-engine",
    section: "Stage, then publish",
    preset: "screen",
    label: "Staged vs live",
    description:
      "The compare-to-published screen: staged changes beside the live set, before anyone confirms the publish. It proves an edit can be checked against production without going live on save.",
    alt: "Compare view with staged policy changes beside the published set.",
    caption: "Staged changes beside the published set. Nothing goes live on save.",
    path: "",
    status: "empty",
  },
  {
    id: "app-authority-stack",
    study: "Authorized payment protection",
    studyId: "authorized-payment-protection",
    section: "Constraint",
    preset: "diagram",
    label: "Authority stack",
    description:
      "A diagram of the layers that share one decision: network floor, bank policy, and reviewer. It proves who can bind whom, including that a bank cannot undercut the floor or browse the full network set.",
    alt: "Diagram of network floor, bank policy, and reviewer, with the floor binding on the bank.",
    caption: "Network floor, bank policy, and the reviewer. The floor stays binding.",
    path: "",
    status: "empty",
  },
  {
    id: "app-floor-hidden",
    study: "Authorized payment protection",
    studyId: "authorized-payment-protection",
    section: "Show whose rule is binding",
    preset: "detail",
    label: "Hidden floor",
    description:
      "The bank user's configuration view: their policy sits under the network floor, and the full network set cannot be opened. It proves subordination without turning the floor into something they can browse or edit.",
    alt: "Bank configuration screen where the network floor applies and the full network policy set cannot be opened.",
    caption: "The bank can see that the floor applies. The network's full set stays closed.",
    path: "",
    status: "empty",
  },
  {
    id: "app-rule-origin",
    study: "Authorized payment protection",
    studyId: "authorized-payment-protection",
    section: "Show whose rule is binding",
    preset: "screen",
    label: "Rule origin",
    description:
      "The review screen at the moment of the decision: which policy or signal caught the payment, and what this reviewer is allowed to do. It proves origin and authority are readable in the same place.",
    alt: "Review screen naming the policy or signal that caught the payment, next to the reviewer's standing.",
    caption: "The catching policy names its source next to the reviewer's standing.",
    path: "",
    status: "empty",
  },
  {
    id: "app-irreversible-queue",
    study: "Authorized payment protection",
    studyId: "authorized-payment-protection",
    section: "Tune the queue for irreversible settlement",
    preset: "screen",
    label: "Irreversible queue",
    description:
      "The case queue after the chargeback window is gone: assignment and escalation when the money cannot be pulled back. It proves the queue was tuned for speed, not for a later dispute.",
    alt: "Case queue tuned for irreversible settlement, with assignment and escalation and no chargeback window.",
    caption: "No chargeback window. The queue is built for speed and a clear escalation.",
    path: "",
    status: "empty",
  },
  {
    id: "autonome-home-prototype",
    study: "Autonome",
    studyId: "autonome",
    section: "Ideate and constrain",
    preset: "detail",
    format: "JPEG",
    label: "Home prototype",
    description:
      "A photo of a prototype built with what the team had at home. It proves the COVID constraint is what forced the work to simplify.",
    alt: "Early Autonome prototype made from materials available at home during COVID.",
    caption: "Prototypes used what was at home. That constraint did the simplifying.",
    path: "",
    status: "empty",
  },
  {
    id: "autonome-three-tool-kit",
    study: "Autonome",
    studyId: "autonome",
    section: "Ideate and constrain",
    preset: "detail",
    format: "JPEG",
    label: "Three-tool kit",
    description:
      "The three-tool kit before the cut to one Meat Handler. It proves the earlier concept was a kit, and why manufacturability pushed it down to a single tool.",
    alt: "The earlier three-tool kitchen kit, before it was cut to the single Meat Handler.",
    caption: "The kit, before the cut to one tool.",
    path: "",
    status: "empty",
  },
  {
    id: "autonome-grablock-patent",
    study: "Autonome",
    studyId: "autonome",
    section: "Path to market",
    preset: "sketch",
    label: "Grablock patent",
    description:
      "The provisional patent drawing for Grablock. It proves the mating idea was defined tightly enough to file, not left as a sketch on the handle page.",
    alt: "Provisional patent drawing of the Grablock mating mechanism.",
    caption: "Grablock, as filed.",
    path: "",
    status: "empty",
  },
  {
    id: "autonome-business-case",
    study: "Autonome",
    studyId: "autonome",
    section: "Path to market",
    preset: "detail",
    label: "Lean plan",
    description:
      "The lean plan as a page: audience, bill of materials, and the retail price that came out of channel margins. It proves the project made a business argument, not only a form.",
    alt: "Lean business plan page for Autonome covering audience, bill of materials, and retail price.",
    caption: "The lean plan: who it is for, what it costs to make, and what it sells for.",
    path: "",
    status: "empty",
  },
];

const slotsById = new Map(imageSlots.map((slot) => [slot.id, slot]));

function fail(message) {
  throw new Error(message);
}

for (const slot of imageSlots) {
  for (const key of ["id", "study", "studyId", "section", "preset", "label", "description", "alt", "caption", "status"]) {
    if (!String(slot[key] ?? "").trim()) fail(`Image slot "${slot.id || "(missing id)"}" needs ${key}.`);
  }
  if (!imagePresets[slot.preset]) fail(`Image slot "${slot.id}" uses unknown preset "${slot.preset}".`);
  if (slot.status !== "empty" && slot.status !== "filled") {
    fail(`Image slot "${slot.id}" status must be empty or filled.`);
  }
  const hasPath = String(slot.path ?? "").trim() !== "";
  if (hasPath !== (slot.status === "filled")) {
    fail(`Image slot "${slot.id}" status is ${slot.status}, but its path does not match.`);
  }
  for (const key of ["description", "alt", "caption", "label", "section"]) {
    if (/[—–]/.test(slot[key])) fail(`Image slot "${slot.id}" ${key} contains a dash that is not a hyphen.`);
  }
}

export function getSlot(id) {
  const slot = slotsById.get(id);
  if (!slot) fail(`Unknown image slot "${id}". Add it to src/lib/image-slot-briefs.js.`);
  return slot;
}

export function presetFor(slot) {
  return imagePresets[slot.preset];
}

export function slotFormat(slot) {
  return slot.format || presetFor(slot).format;
}

export function slotHasFile(id) {
  return String(getSlot(id).path ?? "").trim() !== "";
}
