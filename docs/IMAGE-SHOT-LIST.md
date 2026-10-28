# Image shot list

Slots are the images still to make for the case studies. Each one is a brief: what the picture shows, what point it proves, the preset to export, and draft alt and caption. Empty slots are invisible on the published site. `npm run dev` shows the brief in place.

Inline figures sit in the reading column, `--layout-measure: 744px`. Below 860px that column becomes the full shell. At an 860px viewport the shell is about 775px wide after `--layout-gutter`. That is the widest an inline figure renders. Export width **1584** is the smallest width at or above twice that which keeps a whole-pixel height for every full-column ratio below.

A before/after pair shares the 744px column with a 16px gap from 861px up, about 364px each. Below that the two frames stack, so each one is exported at the full-column size.

Source files are PNG for UI, diagrams, and drawings, and JPEG for photographs. The build converts either to WebP. AVIF is not enabled.

Regenerate this file after a brief changes:

```bash
node scripts/image-shot-list.mjs
```

## Presets

| id | name | aspect ratio | max rendered width | export size px | format | use |
| --- | --- | --- | --- | --- | --- | --- |
| screen | Full-width screen | 16:9 | up to 775px | 1584 × 891 | PNG | A UI screen or hero in the reading column. |
| diagram | Wide diagram | 2:1 | up to 775px | 1584 × 792 | PNG | A diagram that needs a wide stage. 2:1 stays tall enough to read in the 744px column. 21:9 would be shorter than the labels need. |
| pair | Before/after pair | 16:10 | up to 775px | 1584 × 990 | PNG | Two matching screens. From 861px up they share the 744px column with a 16px gap, about 364px each. Below that they stack, so export at the full-column size. |
| detail | Detail crop | 4:3 | up to 775px | 1584 × 1188 | PNG | A crop, a physical object, or a single artifact that needs more height than a screen. |
| sketch | Portrait sketch | 3:4 | up to 775px | 1584 × 2112 | PNG | Paper, a patent plate, or another portrait drawing. Matches the 3:4 frames already used for wireframes and research boards. |
| phone | Tall mobile | 9:19.5 | 360px cap | 720 × 1560 | PNG | A phone screen, capped at 360px wide so it does not stretch across the column. No current study uses it. |

The tall mobile preset is there for a phone screen. None of the current studies use it.

## How to add a file

1. Export the frame from the preset row: the aspect ratio, the export size in pixels, and PNG or JPEG as listed.
2. Drop the file in `src/assets/`.
3. On that slot in `src/lib/image-slot-briefs.js`, set `path` to the filename and set `status` to `filled`. The draft `alt` and `caption` are already written. Edit them if the picture changed.
4. Run `node scripts/image-shot-list.mjs`, then `npm run dev`. A filled slot with a blank alt fails the build. An empty path is left out of `npm run build`.

`rules-paper-wireframes` is already filled. The file on the page is `rules-paper-wireframes.png`. Replace that file in place if you redraw it, and keep the same argument: the evaluation model before any polished UI.

## Slots

### Trust score explainability

| id | case study | section | what to show | preset | export size px | aspect ratio | format | alt draft | caption draft | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| trust-opaque-score | Trust score explainability | Constraint | The score as the analyst saw it before the explainer: a number on the decision, with no factors. It proves the opacity the rest of the study is answering. | Full-width screen | 1584 × 891 | 16:9 | PNG | The review decision showing only a trust score, with no contributing factors on the screen. | The decision was a number. The factors were not on the screen. | empty |
| trust-escalation | Trust score explainability | Constraint | The old path from a merchant challenge to engineering, when the analyst only had the number. It proves why a score they could not explain made manual review feel safer. | Wide diagram | 1584 × 792 | 2:1 | PNG | Diagram of a merchant challenge going to an analyst who only has the score, then on to engineering. | A challenge left the analyst with the number, and the dispute went to engineering. | empty |
| trust-feedback-control | Trust score explainability | Keep absence visible | A crop of the footer control that flags an explanation which does not hold up. It proves the dead end was removed: the flag goes to the risk team as reason-code tuning. | Detail crop | 1584 × 1188 | 4:3 | PNG | Footer control used to flag a trust score explanation that does not hold up. | A weak explanation can be flagged. That flag is how reason codes get tuned. | empty |

### Rules engine

| id | case study | section | what to show | preset | export size px | aspect ratio | format | alt draft | caption draft | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rules-and-only-before | Rules engine | Make OR legible | The old Kount Rule Set Editor: Core checkout protection as a flat list of conditions and actions, with no group control. It shows the editor before nested boolean logic. | Before/after pair | 1584 × 990 | 16:10 | PNG | Kount Rule Set Editor for Core checkout protection, a flat list of rule conditions and rule actions. | The previous Rule Set Editor. Conditions and actions in one list. | filled |
| rules-nested-editor | Rules engine | Make OR legible | The shipped dark editor: conditions in numbered groups, AND or OR inside a group, and OR between groups. This is the product screen, not the paper sheet under it. | Before/after pair | 1584 × 990 | 16:10 | PNG | Dark policy conditions editor with three groups, AND or OR inside a group, and OR selected between groups. | The shipped editor. AND or OR inside a group, OR between groups. | filled |
| rules-paper-wireframes | Rules engine | Make OR legible | The structure-studies sheet titled Make OR legible. Sketches move from trigger, policy, and condition to nested AND and OR groups. It shows the evaluation model drawn before a polished screen. | Portrait sketch | 1584 × 2112 | 3:4 | PNG | Hand-drawn structure studies titled Make OR legible, from a trigger, policy, and condition stack to nested AND and OR groups. | Early structure work for OR logic. The evaluation model had to be right before the UI was worth polishing. | filled |
| rules-engines-merge | Rules engine | Replace triggers with segments | Diagram of both states: the Newest Policy Engine (Payments) plus the Newer Policy Engines (Logins and New Account Openings) equals one Unified Policy Engine with all three. | Wide diagram | 1584 × 792 | 2:1 | PNG | Diagram adding the Newest Policy Engine for Payments to the Newer Policy Engines for Logins and New Account Openings, equaling one Unified Policy Engine. | Newest and Newer policy engines, and the unified engine. | filled |
| rules-policy-management | Rules engine | Replace triggers with segments | The Kount 360 Policy Management screen for Payments Fraud: the active set, its version details, and the segment editor with nested condition groups. It shows the configuration surface after triggers became segments. | Before/after pair | 1584 × 990 | 16:10 | PNG | Kount 360 Policy Management with the active Payments Fraud set, version details, and a segment editor of nested condition groups. | Policy Management. The set, its version, and the segment's condition groups. | filled |
| rules-compare-published | Rules engine | Stage, then publish | Version history on Policy Management. Version 8 is a draft restored from version 5 and marked editing now. Version 7 is published and marked live now. The set is marked with unpublished changes. It shows a restore that stays a draft until someone publishes. | Full-width screen | 1584 × 891 | 16:9 | PNG | Policy Management version history. Version 8 is a draft restored from version 5. Version 7 is published and live. The set is marked with unpublished changes. | Version history. A restored draft sits above the published version. | filled |

### Authorized payment protection

| id | case study | section | what to show | preset | export size px | aspect ratio | format | alt draft | caption draft | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| app-authority-stack | Authorized payment protection | Constraint | A diagram of the layers that share one decision: network floor, bank policy, and reviewer. It proves who can bind whom, including that a bank cannot undercut the floor or browse the full network set. | Wide diagram | 1584 × 792 | 2:1 | PNG | Diagram of network floor, bank policy, and reviewer, with the floor binding on the bank. | Network floor, bank policy, and the reviewer. The floor stays binding. | empty |
| app-floor-hidden | Authorized payment protection | Show whose rule is binding | The bank user's configuration view: their policy sits under the network floor, and the full network set cannot be opened. It proves subordination without turning the floor into something they can browse or edit. | Detail crop | 1584 × 1188 | 4:3 | PNG | Bank configuration screen where the network floor applies and the full network policy set cannot be opened. | The bank can see that the floor applies. The network's full set stays closed. | empty |
| app-rule-origin | Authorized payment protection | Show whose rule is binding | The review screen at the moment of the decision: which policy or signal caught the payment, and what this reviewer is allowed to do. It proves origin and authority are readable in the same place. | Full-width screen | 1584 × 891 | 16:9 | PNG | Review screen naming the policy or signal that caught the payment, next to the reviewer's standing. | The catching policy names its source next to the reviewer's standing. | empty |
| app-irreversible-queue | Authorized payment protection | Tune the queue for irreversible settlement | The case queue after the chargeback window is gone: assignment and escalation when the money cannot be pulled back. It proves the queue was tuned for speed, not for a later dispute. | Full-width screen | 1584 × 891 | 16:9 | PNG | Case queue tuned for irreversible settlement, with assignment and escalation and no chargeback window. | No chargeback window. The queue is built for speed and a clear escalation. | empty |

### Autonome

| id | case study | section | what to show | preset | export size px | aspect ratio | format | alt draft | caption draft | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| autonome-home-prototype | Autonome | Ideate and constrain | A photo of a prototype built with what the team had at home. It proves the COVID constraint is what forced the work to simplify. | Detail crop | 1584 × 1188 | 4:3 | JPEG | Early Autonome prototype made from materials available at home during COVID. | Prototypes used what was at home. That constraint did the simplifying. | empty |
| autonome-three-tool-kit | Autonome | Ideate and constrain | The three-tool kit before the cut to one Meat Handler. It proves the earlier concept was a kit, and why manufacturability pushed it down to a single tool. | Detail crop | 1584 × 1188 | 4:3 | JPEG | The earlier three-tool kitchen kit, before it was cut to the single Meat Handler. | The kit, before the cut to one tool. | empty |
| autonome-grablock-patent | Autonome | Path to market | The provisional patent drawing for Grablock. It proves the mating idea was defined tightly enough to file, not left as a sketch on the handle page. | Portrait sketch | 1584 × 2112 | 3:4 | PNG | Provisional patent drawing of the Grablock mating mechanism. | Grablock, as filed. | empty |
| autonome-business-case | Autonome | Path to market | The lean plan as a page: audience, bill of materials, and the retail price that came out of channel margins. It proves the project made a business argument, not only a form. | Detail crop | 1584 × 1188 | 4:3 | PNG | Lean business plan page for Autonome covering audience, bill of materials, and retail price. | The lean plan: who it is for, what it costs to make, and what it sells for. | empty |
