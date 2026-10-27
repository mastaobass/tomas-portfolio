/**
 * Case-study image slots.
 *
 * Place a slot in a study with <ImageSlot id="..." /> or
 * <ImageCompare before="..." after="...">. Fill it by dropping a png, jpg,
 * or webp in src/assets/ and setting the three fields below:
 *
 *   path     filename only, such as "rules-and-only.png". "" keeps the slot empty.
 *   alt      what the image shows. Required once path is set.
 *   caption  optional line under the published image.
 *
 * label, note, and ratio drive the dev placeholder. An empty path renders
 * nothing in a production build. `npm run dev` shows the placeholder.
 * PUBLIC_SHOW_IMAGE_SLOTS=true keeps placeholders in a build. Leave it unset
 * for the live site.
 */

const loaders = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,avif}", {
  import: "default",
});

const SAFE_RATIO = /^\d{1,2}\s*\/\s*\d{1,2}$/;

export const showImageSlots =
  import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_IMAGE_SLOTS === "true";

export const imageSlots = {
  // rules-engine.mdx, beside the paper wireframes
  "rules-and-only-before": {
    path: "",
    alt: "",
    caption: "",
    label: "Before",
    note: "Before: the old AND-only rule editor. Place this to the left of the paper wireframes.",
    ratio: "16 / 9",
  },
  "rules-nested-editor": {
    path: "",
    alt: "",
    caption: "",
    label: "After",
    note: "After: the shipped nested AND/OR editor. Place this to the right of the paper wireframes.",
    ratio: "16 / 9",
  },
  // rules-engine.mdx, "Replace triggers with segments"
  "rules-engines-merge": {
    path: "",
    alt: "",
    caption: "",
    label: "Diagram",
    note: "Diagram of two policy engines merging into one. Login, New Account Opening, and Payments Fraud on a single configuration surface.",
    ratio: "16 / 9",
  },
  // rules-engine.mdx, "Stage, then publish"
  "rules-compare-published": {
    path: "",
    alt: "",
    caption: "",
    label: "Staged vs live",
    note: "Compare to published. The staged set beside the live set, before someone confirms the publish.",
    ratio: "16 / 9",
  },
  // trust-score-explainability.mdx, after the analyst quote
  "trust-opaque-score": {
    path: "",
    alt: "",
    caption: "",
    label: "Opaque score",
    note: "The score as analysts saw it before the explainer: a number from 0 to 99.9 with no factors on the screen.",
    ratio: "16 / 9",
  },
  // authorized-payment-protection.mdx, after the authority table
  "app-authority-stack": {
    path: "",
    alt: "",
    caption: "",
    label: "Authority stack",
    note: "Working diagram of who can bind whom: network floor, bank policy, and the reviewer. The shipped tiers frame already leads this study.",
    ratio: "16 / 9",
  },
  // authorized-payment-protection.mdx, "Tune the queue for irreversible settlement"
  "app-irreversible-queue": {
    path: "",
    alt: "",
    caption: "",
    label: "Irreversible queue",
    note: "The queue tuned for irreversible settlement: assignment and escalation when there is no chargeback window.",
    ratio: "16 / 9",
  },
  // autonome.mdx, before the single-tool handle sketch
  "autonome-three-tool-kit": {
    path: "",
    alt: "",
    caption: "",
    label: "Three-tool kit",
    note: "The three-tool kit before the cut to one Meat Handler. A photo or sketch of that earlier kit.",
    ratio: "4 / 3",
  },
};

export function getSlot(id) {
  const slot = imageSlots[id];
  if (!slot) {
    throw new Error(`Unknown image slot "${id}". Add it to src/lib/image-slots.js.`);
  }
  return slot;
}

export function slotHasFile(id) {
  return String(getSlot(id).path ?? "").trim() !== "";
}

export function slotRatio(slot) {
  return SAFE_RATIO.test(String(slot.ratio ?? "")) ? slot.ratio : "16 / 9";
}

export async function resolveCaseImage(path, id) {
  const filename = String(path ?? "")
    .trim()
    .split("/")
    .filter(Boolean)
    .pop();
  if (!filename) return undefined;

  const key = Object.keys(loaders).find((entry) => entry.endsWith(`/${filename}`));
  if (!key) {
    throw new Error(
      `Image slot "${id}" points at "${path}", but that file is not in src/assets/. Drop the file in, then set path to its filename.`,
    );
  }

  const loaded = await loaders[key]();
  const image = loaded && typeof loaded === "object" && "width" in loaded ? loaded : loaded?.default;
  if (!image || typeof image !== "object" || !("width" in image) || !("height" in image)) {
    throw new Error(
      `Image slot "${id}" resolved "${filename}" without width and height, so the page could not reserve space for it.`,
    );
  }
  return image;
}
