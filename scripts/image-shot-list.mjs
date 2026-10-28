import { writeFileSync } from "node:fs";
import { imagePresets, imageSlots, slotFormat } from "../src/lib/image-slot-briefs.js";

function cell(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function exportSize(preset) {
  return `${preset.exportWidth} × ${preset.exportHeight}`;
}

const presetRows = Object.entries(imagePresets)
  .map(([id, preset]) => {
    const width = preset.limitWidth ? `${preset.limitWidth}px cap` : "up to 775px";
    return `| ${cell(id)} | ${cell(preset.label)} | ${cell(preset.ratioLabel)} | ${cell(width)} | ${cell(exportSize(preset))} | ${cell(preset.format)} | ${cell(preset.use)} |`;
  })
  .join("\n");

const studies = [];
for (const slot of imageSlots) {
  let group = studies.find((entry) => entry.study === slot.study);
  if (!group) {
    group = { study: slot.study, slots: [] };
    studies.push(group);
  }
  group.slots.push(slot);
}

const slotTables = studies
  .map((group) => {
    const rows = group.slots
      .map((slot) => {
        const preset = imagePresets[slot.preset];
        return `| ${cell(slot.id)} | ${cell(slot.study)} | ${cell(slot.section)} | ${cell(slot.description)} | ${cell(preset.label)} | ${cell(exportSize(preset))} | ${cell(preset.ratioLabel)} | ${cell(slotFormat(slot))} | ${cell(slot.alt)} | ${cell(slot.caption)} | ${cell(slot.status)} |`;
      })
      .join("\n");
    return `### ${group.study}

| id | case study | section | what to show | preset | export size px | aspect ratio | format | alt draft | caption draft | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows}`;
  })
  .join("\n\n");

const doc = `# Image shot list

Slots are the images still to make for the case studies. Each one is a brief: what the picture shows, what point it proves, the preset to export, and draft alt and caption. Empty slots are invisible on the published site. \`npm run dev\` shows the brief in place.

Inline figures sit in the reading column, \`--layout-measure: 744px\`. Below 860px that column becomes the full shell. At an 860px viewport the shell is about 775px wide after \`--layout-gutter\`. That is the widest an inline figure renders. Export width **1584** is the smallest width at or above twice that which keeps a whole-pixel height for every full-column ratio below.

A before/after pair shares the 744px column with a 16px gap from 861px up, about 364px each. Below that the two frames stack, so each one is exported at the full-column size.

Source files are PNG for UI, diagrams, and drawings, and JPEG for photographs. The build converts either to WebP. AVIF is not enabled.

Regenerate this file after a brief changes:

\`\`\`bash
node scripts/image-shot-list.mjs
\`\`\`

## Presets

| id | name | aspect ratio | max rendered width | export size px | format | use |
| --- | --- | --- | --- | --- | --- | --- |
${presetRows}

The tall mobile preset is there for a phone screen. None of the current studies use it.

## How to add a file

1. Export the frame from the preset row: the aspect ratio, the export size in pixels, and PNG or JPEG as listed.
2. Drop the file in \`src/assets/\`.
3. On that slot in \`src/lib/image-slot-briefs.js\`, set \`path\` to the filename and set \`status\` to \`filled\`. The draft \`alt\` and \`caption\` are already written. Edit them if the picture changed.
4. Run \`node scripts/image-shot-list.mjs\`, then \`npm run dev\`. A filled slot with a blank alt fails the build. An empty path is left out of \`npm run build\`.

\`rules-paper-wireframes\` is already filled. The file on the page is \`rules-paper-wireframes.png\`. Replace that file in place if you redraw it, and keep the same argument: the evaluation model before any polished UI.

## Slots

${slotTables}
`;

writeFileSync(new URL("../docs/IMAGE-SHOT-LIST.md", import.meta.url), doc);
console.log(`Wrote ${imageSlots.length} slots.`);
