import rulesSets from "../assets/rules-sets-staging.png";
import rulesEditor from "../assets/rules-segment-editor.png";
import trustHero from "../assets/trust-score-hero.png";
import trustQueue from "../assets/trust-score-queue.png";
import appReview from "../assets/app-case-review.png";
import appTiers from "../assets/app-policy-tiers.jpg";

/**
 * Shipped-interface frames for the three primary cases.
 * Homepage cards use `thumb`. Case pages lead with `gallery`
 * before any process artifact. Alts and captions match the studies.
 */
export const caseMedia = {
  "rules-engine": {
    thumb: rulesSets,
    gallery: [
      {
        src: rulesSets,
        alt: "Policy Management set views showing the active set, pending changes, and publish path",
        caption:
          "Active set, pending changes, and a publish path. Staging is the difference between configuration and a leap of faith.",
      },
      {
        src: rulesEditor,
        alt: "Segment editor in Kount 360 Policy Management showing conditions, tags, and linked segments",
        caption:
          "Segments group traffic. Policies attach conditions and outcomes. The surface has to make both readable in the same place.",
      },
    ],
  },
  "trust-score-explainability": {
    thumb: trustHero,
    gallery: [
      {
        src: trustHero,
        alt: "Transaction Trust Score modal showing score 85.6, waterfall chart of contributing factors, and two-column reason codes",
        caption:
          "The trust score explainer. Score bands render at equal width even though their ranges are unequal. Kount's published threshold guidance puts roughly 5% of volume below 61, so the vast majority of traffic sits in the top bands — proportional widths would compress the range where nearly every real decision happens.",
      },
      {
        src: trustQueue,
        alt: "Reconstructed payment review queue with ten transactions, trust scores, and decision statuses",
        caption:
          "Ten reconstructed payments. Open a row to work the payments-fraud case. This is the surface analysts lived in, not a component gallery.",
      },
    ],
  },
  "authorized-payment-protection": {
    thumb: appReview,
    gallery: [
      {
        src: appReview,
        alt: "Case review surface showing rule or signal origin and reviewer standing for an authorized payment decision",
        caption:
          "Whose rule or signal caught this payment, and what standing does the reviewer have. Authority and model output share one surface.",
      },
      {
        src: appTiers,
        alt: "Three-layer policy model showing network floor, bank policy, and reviewer standing with origin of each rule visible",
        caption:
          "Network floor, bank policy, and reviewer standing in one view. Origin of each rule stays visible so authority is never guessed.",
      },
    ],
  },
};

export function mediaFor(id) {
  return caseMedia[id];
}
