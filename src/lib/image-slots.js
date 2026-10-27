/**
 * Resolves a slot path to an image in src/assets/.
 * Briefs and presets live in image-slot-briefs.js.
 *
 * An empty path renders nothing in a production build. `npm run dev`
 * shows the brief. PUBLIC_SHOW_IMAGE_SLOTS=true keeps placeholders in a
 * build. Leave it unset for the live site.
 */

export {
  getSlot,
  imagePresets,
  imageSlots,
  presetFor,
  slotFormat,
  slotHasFile,
} from "./image-slot-briefs.js";

const loaders = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,avif}", {
  import: "default",
});

export const showImageSlots =
  import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_IMAGE_SLOTS === "true";

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
