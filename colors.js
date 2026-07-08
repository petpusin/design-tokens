/**
 * FINALIZED (v4 — REVERTED naming decision, see below) — merged from 3 source files,
 * all FutureSkill panels:
 *   A = tailwindColors.js (v1) → fs-content-panel
 *   B = tailwindColors.js (v2) → fs-biz-panel
 *   C = colors.js ("FS" suffix, inline usage comments) → fs-assessment-panel
 *   D = UX/UI-provided tailwind.config.js reference (source of `themeExtensions` below)
 *   E = UX/UI-provided tailwind.config.js v2, confirmed fs-biz-panel's real current file
 *
 * ── NAMING DECISION (v4 — REVERSED from earlier "keep renamed" decision) ──
 * Raw groups now use PLAIN Tailwind-matching names (purple, red, yellow, green, blue,
 * cyan, violet, orange, black, gray, neutral) — matching every source file's own
 * convention exactly, INCLUDING the collision with Tailwind v3's own default palette
 * (red/purple/gray/etc. all get overridden by this package's values).
 *
 * Reasoning for the reversal: the earlier "rename to avoid collision" decision, while
 * technically safer, required a codemod across every consuming panel's JSX AND created
 * constant friction reconciling this package against real UX-provided files (which all
 * use plain names) — every new reference file needed manual re-mapping (red→redBrand
 * etc.) as a source of confusion/errors throughout this project. Matching the existing
 * convention removes both costs: zero JSX changes needed in any panel, and every future
 * UX-provided file diffs directly against this package with no name translation step.
 *
 * Accepted tradeoff: any Tailwind utility class using a name in the colliding list
 * above will render THIS package's brand color, not Tailwind's stock color — by design,
 * matching how the real production panels already behave today (confirmed via file D/E).
 * `black` specifically needs a `DEFAULT` key so bare `bg-black` still resolves (this was
 * true regardless of naming — see history — not reintroducing that bug here).
 *
 * ── VALUE CONFLICTS re-litigated against file D — both re-confirmed as-is ──
 *   - yellow.100: kept #f9ebaf (file D uses file A's older #fff2a8 — not adopted)
 *   - dark.input2: kept #434D5D (file D uses file A's value, same as `input` — not adopted)
 *
 * ── SCOPE EXPANSION (this revision) ──
 * File D introduced a `colorsSemantic` light/dark theming system built on
 * `mainBrand`/`secondaryBrand`/`neutralSolid`/`basicBase` + Tailwind's `theme()`
 * callback. Decision: bring this INTO the shared package (see `core.themeExtensions`
 * and `tailwind-preset.js`'s `colorsSemantic` function) rather than leave it per-panel.
 *
 * ⚠️ OPEN QUESTION — NOT YET RESOLVED: `mainBrand`/`secondaryBrand` depend on CSS custom
 * properties (--color-primary-500/300, --color-deepPink-500/300) that must be defined
 * as real CSS somewhere. Source location of that CSS is unknown — needs to be found in
 * fs-content-panel and either moved into this package or documented as a required
 * companion file for every consumer.
 *
 * Also added `info` (found missing during file D diff, no conflict, pure addition —
 * one source file had a stray double-hash typo in the value, corrected here).
 *
 * Still deliberately excluded (not re-litigated here, see project notes):
 *   - `other{}` numeric-index bucket — confirmed still present with real values in file D,
 *     meaning it's still live in production. Needs per-panel usage audit before reintroducing
 *     with real names — holding off is now a bigger risk than before this was known, escalate.
 *   - `gray.upload/menu/email/overview` (fs-biz-panel only) — assumed dead/component-
 *     specific, deliberately dropped from neutral. Revisit only if migration
 *     breaks on these.
 *
 * ── REVISION v3 (after UX file #2 review — confirmed fs-biz-panel's real config) ──
 *   - `gray`/`neutral` UN-MERGED back into separate `gray`/`neutral` groups
 *     per explicit UX intent (kept independent on purpose, even though values currently
 *     match — see inline comment on neutral/gray).
 *   - `basicBase.dark` now derives from --color-neutral-50 via color-mix() instead of
 *     hardcoded rgba(25,25,25,X) — adds a 3rd required CSS custom property to the open
 *     question above (now: --color-primary-500/300, --color-deepPink-500/300,
 *     --color-neutral-50).
 *   - `apps.fsBizPanel` expanded significantly: confirmed this file IS fs-biz-panel's
 *     real config (comments mention Assessment/OJT because those are FEATURE/tag names
 *     it manages, not the panel's own identity). Added blueViolet/burntOrange/
 *     forestGreen/vividGreen raw colors + assessment/ojt theme groups + a
 *     colorsSemanticExtension merged into core's colorsSemantic for this panel only.
 *   - fs-biz-panel's classroom-family tokens now match fs-content-panel's FULL set
 *     (not just the 3 that matched before) — 2/3 panels now identical, which is a
 *     stronger signal to promote to `core` than before. NOT done yet — flagging only.
 */
module.exports = {
  core: {
    raw: {
      // ── Identical across all sources — safe, no decision needed ──
      // REVISED per UX file v3 comment: "gray แยกเป็นสเกลอิสระจาก neutral ตั้งใจ (ไม่ผูกกัน
      // แก้แยกกันได้)" — un-merged back into two independent groups even though values
      // currently match, since the UX team wants them editable separately in the future.
      neutral: {
        50: '#ffffff', 100: '#fafafa', 200: '#f5f5f5', 300: '#f4f6f9',
        400: '#d9d9d9', 500: '#bfbfbf', 600: '#8c8c8c', 700: '#595959',
        800: '#262626', 900: '#0a0f18',
      },
      // `gray` collides with a Tailwind default too — renamed gray for the same
      // reason as the other renamed groups. Currently identical to neutral except
      // for the 4 extra keys — that's expected and intentional per the UX team, not a bug.
      gray: {
        50: '#ffffff', 100: '#fafafa', 200: '#f5f5f5', 300: '#f4f6f9',
        400: '#d9d9d9', 500: '#bfbfbf', 600: '#8c8c8c', 700: '#595959',
        800: '#262626', 900: '#0a0f18',
        status: '#333C4F', header: '#9B9B9B', divide: '#383838', subtitle: '#535353',
        // fs-biz-panel's OLD file (v2) also had upload/menu/email/overview here —
        // still deliberately excluded, assumed dead/component-specific. Revisit if
        // migration breaks on gray-upload etc.
      },
      neutralSecondary: {
        50: '#ebedf6', 100: '#cdd4e0', 200: '#afb7c8', 300: '#909baf',
        400: '#7a869d', 500: '#63718b', 600: '#56637a', 700: '#455064',
        800: '#363e4e', 900: '#232a37',
      },
      neutralAnalogous: {
        50: '#f3f9ff', 100: '#ecf3ff', 200: '#e3eafa', 300: '#d4daea',
        400: '#b0b7c6', 500: '#9197a6', 600: '#686f7c', 700: '#555b68',
        800: '#363c49', 900: '#161c27',
      },

      // MISSING UNTIL NOW — every source file (A, B, both UX files) had this raw scale,
      // CSS-var-based (not hardcoded hex) so runtime theme switching can change primary
      // color without a rebuild. We'd dropped it entirely across every prior revision —
      // only `semantic.primary` (a differently-shaped DEFAULT/hover/etc object) existed.
      // Both now get merged into one `primary` key in tailwind-preset.js — see there.
      primary: {
        50: 'var(--color-primary-50)', 100: 'var(--color-primary-100)', 200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)', 400: 'var(--color-primary-400)', 500: 'var(--color-primary-500)',
        600: 'var(--color-primary-600)', 700: 'var(--color-primary-700)', 800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },

      // was `purple` (A,B) === `primaryFS` (C) — literally identical, confirmed brand primary
      purple: {
        50: '#F1E7FB', 100: '#DBC5F5', 200: '#C39EEF', 300: '#AB74E9',
        400: '#9852E3', 500: '#842CDD', 600: '#7A27D6', 700: '#6C1CCD',
        800: '#5E13C7', 900: '#4900B9',
      },

      // CONFIRMED by team decision: File A's scale chosen over B/C's muted family.
      purpleDeep: {
        50: '#f8f0ff', 100: '#f7f0ff', 200: '#e9d6ff', 300: '#cfadff',
        400: '#b485ff', 500: '#975DFF', 600: '#7343d9', 700: '#542eb3',
        800: '#391d8c', 900: '#261466',
      },

      pink: {
        50: '#fbe3eb', 100: '#f6b9ce', 200: '#f08cae', 300: '#eb5e8f',
        400: '#e63a76', 500: '#e2105f', 600: '#d10e5c', 700: '#bc0c57',
        800: '#a70853', 900: '#82044b',
      },

      green: {
        50: '#e5f6ea', 100: '#c1e8cc', 200: '#98d9ac', 300: '#6aca8b',
        400: '#44bf72', 500: '#00b35A', 600: '#00a450', 700: '#009244',
        800: '#008038', 900: '#006124',
      },

      // CONFIRMED by team decision: B/C family (over A's older values), .100 = confirmed exact value.
      yellow: {
        50: '#fdf6df', 100: '#f9ebaf', 200: '#f5d97c', 300: '#f1cc46',
        400: '#efc018', 500: '#edb500', 600: '#eda800', 700: '#ed9600',
        800: '#ed8500', 900: '#ed6500', status: '#FFE2AA',
      },

      // CONFIRMED by team decision: A/C consensus value (#ff3733) chosen over B's outlier.
      red: {
        50: '#ffebef', 100: '#ffcdd4', 200: '#f99a9b', 300: '#ff4d50',
        400: '#ff3733', 500: '#ff3733', 600: '#f72d34', 700: '#e41f2d',
        800: '#d71426', 900: '#c80019',
      },

      // ── Present only in A/B (not in C) — no cross-file conflict found, kept as-is ──
      deepPink: {
        50: '#ffe6ee', 100: '#ffbdd6', 200: '#ff94c1', 300: '#ff6bae',
        400: '#ff429e', 500: '#FF1A8F', 600: '#D90b7c', 700: '#b30068',
        800: '#8C0056', 900: '#660042',
      },
      hotPink: {
        50: '#fff0f5', 100: '#fff0f6', 200: '#ffdeec', 300: '#ffb5d6',
        400: '#fc8bc2', 500: '#EF5DA8', 600: '#c9448e', 700: '#a32f73',
        800: '#7d1e59', 900: '#57143f',
      },
      orange: {
        50: '#fff6e6', 100: '#ffe3ba', 200: '#ffcf91', 300: '#ffb969',
        400: '#ff9f40', 500: '#FD8116', 600: '#d66209', 700: '#b04600',
        800: '#8a3200', 900: '#632100',
      },
      orangeRed: {
        50: '#fff6f0', 100: '#ffdec9', 200: '#ffc2a1', 300: '#ffa378',
        400: '#fc804e', 500: '#F05623', 600: '#c93b14', 700: '#a32508',
        800: '#7d1300', 900: '#570a00',
      },
      violet: {
        50: '#f4edff', 100: '#d8c4ff', 200: '#b99cff', 300: '#9873ff',
        400: '#744aff', 500: '#4E20FF', 600: '#3311d9', 700: '#1c05b3',
        800: '#0e008c', 900: '#070066',
      },
      blue: {
        50: '#e6fbff', 100: '#b3f1ff', 200: '#8ae6ff', 300: '#61d7ff',
        400: '#36bff5', 500: '#0EA5E9', 600: '#027fc2', 700: '#00609c',
        800: '#004475', 900: '#002b4f',
      },
      deepBlue: {
        50: '#e6f2ff', 100: '#a3ceff', 200: '#7ab4ff', 300: '#5297ff',
        400: '#2977ff', 500: '#0051F7', 600: '#003fd1', 700: '#002eab',
        800: '#001f85', 900: '#00135e',
      },
      lightGreen: {
        50: '#e6ffe6', 100: '#a9f5ad', 200: '#7be884', 300: '#51db61',
        400: '#2bcf44', 500: '#0AC12D', 600: '#009c22', 700: '#00751d',
        800: '#004f16', 900: '#00290d',
      },
      cdgGreen: {
        50: '#eefced', 100: '#e2f0e1', 200: '#c5e3c6', 300: '#6d9470',
        400: '#2bcf44', 500: '#16351A', 600: '#122915', 700: '#021905',
        800: '#001100', 900: '#000900',
      },
      cyan: {
        50: '#E6FFFB', 100: '#B5F5EC', 200: '#87E8DE', 300: '#5CDBD3',
        400: '#36CFC9', 500: '#13C2C2', 600: '#08979C', 700: '#006D75',
        800: '#00474F', 900: '#002329',
      },
      neutralNoble: {
        50: '#CDCDCD', 100: '#7C7C7C', 200: '#565656', 300: '#404040',
        400: '#2D2D2D', 500: '#101010', 600: '#0E0E0E', 700: '#0C0C0C',
        800: '#060606', 900: '#000000',
      },
      pinkLady: {
        50: '#FEFAFA', 100: '#FFF0F0', 200: '#FFF0F1', 300: '#FFF0F2',
        400: '#FFDEE3', 500: '#FDB4C2', 600: '#D68D9E', 700: '#B06B7E',
        800: '#8A4D5F', 900: '#633746',
      },
      black: {
        DEFAULT: '#080817', // added so bare `bg-black`/`text-black` still resolves (see file header note)
        body: '#F2F3F4', 100: '#FFFFFF', 200: '#E6E6EA', 300: '#BCBCC0',
        400: '#7E7E82', 500: '#2E2E30', 600: '#212129', 700: '#171722',
        800: '#0E0E1B', 900: '#080817',
      },

      // CONFIRMED by team decision: input2 = B's value (#434D5D), distinct from `input`.
      // Kept B's fuller key set (input-disabled, upload, subtext, divide, modal, detail, info)
      // since it's a superset of A, not a conflict.
      dark: {
        input: '#232A37',
        input2: '#434D5D',
        'input-disabled': '#2C2E32', upload: '#DFE2E5', 'upload-icon': '#787878',
        text: '#8A94A6', text2: '#B0B7C3', subtext: '#434D5F', divide: '#2f3746',
        modal: '#3D3C41', detail: '#0A0F18', info: '#9B9B9B',
        100: '#8A8AAB', 200: '#6D6D8A', 300: '#43435C', 400: '#35354B',
        500: '#2C2C3D', 600: '#202034', 700: '#16162B', 800: '#0E0E23', 900: '#2D3E76',
      },

      // ── State scales (success/warning/danger) — CONFIRMED identical between A and B, zero conflict.
      // These are DISTINCT palettes from green/yellow/red in the source files (not aliases
      // of them) — e.g. success.400 (#41D9A2, minty) vs green.400 (#44bf72, standard green) are
      // genuinely different colors. Keep them separate; don't collapse into green/yellow/red.
      // DEFAULT key added (=.500) so bare `bg-success` still works, same fix pattern as the black issue.
      success: {
        DEFAULT: '#0DC180',
        50: '#f2fbf7', 100: '#CCFBED', 200: '#9BF8D1', 300: '#68ECBC', 400: '#41D9A2',
        500: '#0DC180', 600: '#09A576', 700: '#068A5A', 800: '#046F48', 900: '#025C3C',
        allow: '#0CA68A', overview: '#0CC281', status: '#A6F0E3',
      },
      warning: {
        DEFAULT: '#FFC832',
        50: '#fefbf2', 100: '#FFF8D6', 200: '#FFEFAD', 300: '#FFE483', 400: '#FFDA65',
        500: '#FFC832', 600: '#DBA524', 700: '#B78419', 800: '#93650F', 900: '#7A4F09',
      },
      danger: {
        DEFAULT: '#FF3F3F',
        50: '#fef5f5', 100: '#FFD8D8', 200: '#FFB2B2', 300: '#FF8B8B', 400: '#FF6F6F',
        500: '#FF3F3F', 600: '#DB2E2E', 700: '#B71F1F', 800: '#931414', 900: '#7A0C0C',
      },

      // Found missing during UX file diff — no conflict, pure addition. Source had a
      // typo ('##F4FBFF' double-hash) in one of the 3 source files; corrected here.
      info: {
        50: '#F4FBFF', 500: '#3C9FFC', 600: '#3388EC',
      },
    },

    // ── Semantic layer — only for concepts that AREN'T already a full raw scale.
    semantic: {
      primary: { DEFAULT: '#842CDD', hover: '#6C1CCD', border: '#7A27D6', selectedBg: '#DBC5F5', foreground: '#ffffff' },
      background: '#ffffff',
      foreground: '#0a0f18',
    },

    // ── Theme extension groups from the UX/UI design system file (light/dark theming).
    // These rely on CSS custom properties (--color-primary-500, --color-primary-300,
    // --color-deepPink-300, --color-deepPink-500) that must be defined somewhere as real
    // CSS (e.g. a :root / [data-theme="dark"] stylesheet) — NOT provided by this JS file.
    // ⚠️ OPEN QUESTION: where are these CSS custom properties currently defined in
    // fs-content-panel today? That definition needs to move into this package too
    // (or be documented as a required companion file each consumer must include),
    // otherwise `mainBrand`/`secondaryBrand` resolve to nothing at runtime.
    themeExtensions: {
      mainBrand: {
        light: {
          50: 'color-mix(in srgb, var(--color-primary-500) 5%, transparent)',
          200: 'color-mix(in srgb, var(--color-primary-500) 20%, transparent)',
          800: 'color-mix(in srgb, var(--color-primary-500) 80%, transparent)',
          1000: 'var(--color-primary-500)',
        },
        dark: {
          50: 'color-mix(in srgb, var(--color-primary-300) 5%, transparent)',
          200: 'color-mix(in srgb, var(--color-primary-300) 20%, transparent)',
          800: 'color-mix(in srgb, var(--color-primary-300) 80%, transparent)',
          1000: 'var(--color-primary-300)',
        },
      },
      secondaryBrand: {
        dark: {
          50: 'color-mix(in srgb, var(--color-deepPink-300) 5%, transparent)',
          200: 'color-mix(in srgb, var(--color-deepPink-300) 20%, transparent)',
          800: 'color-mix(in srgb, var(--color-deepPink-300) 80%, transparent)',
          1000: 'var(--color-deepPink-300)',
        },
        light: {
          50: 'color-mix(in srgb, var(--color-deepPink-500) 5%, transparent)',
          200: 'color-mix(in srgb, var(--color-deepPink-500) 20%, transparent)',
          800: 'color-mix(in srgb, var(--color-deepPink-500) 80%, transparent)',
          1000: 'var(--color-deepPink-500)',
        },
      },
      // Derived from neutral + neutralAnalogous — kept as a function so it can
      // read the final resolved raw scales rather than duplicating hex a 3rd time.
      neutralSolid: (raw) => ({
        50: raw.neutral[50],
        100: raw.neutral[100],
        150: raw.neutral[200],
        500: raw.neutralAnalogous[500],
        700: raw.neutralAnalogous[700],
        800: raw.neutralAnalogous[800],
        850: '#262c38', // hardcoded in source — doesn't map to any existing scale
        900: raw.neutralAnalogous[900],
      }),
      // REVISED per UX file v3: dark side now derives from --color-neutral-50 (near-white)
      // via color-mix() instead of hardcoded near-black rgba — makes more sense for a dark
      // theme overlay (light text/fill on dark bg) and requires that CSS var to exist too
      // (added to the "OPEN QUESTION" list in the file header). light side is the same
      // opacity values as before, just hex+alpha syntax instead of rgba() — verified
      // mathematically equivalent (0.02=05, 0.04=0a, 0.1=1a, 0.45=73, 0.65=a6, 0.9=e6 in hex alpha).
      basicBase: {
        dark: {
          25: 'color-mix(in srgb, var(--color-neutral-50) 3%, transparent)',
          50: 'color-mix(in srgb, var(--color-neutral-50) 6%, transparent)',
          100: 'color-mix(in srgb, var(--color-neutral-50) 12%, transparent)',
          500: 'color-mix(in srgb, var(--color-neutral-50) 60%, transparent)',
          700: 'color-mix(in srgb, var(--color-neutral-50) 78%, transparent)',
          1000: 'var(--color-neutral-50)',
        },
        light: {
          25: '#19191905', 50: '#1919190a', 100: '#1919191a',
          500: '#19191973', 700: '#191919a6', 1000: '#191919e6',
        },
      },
    },
  },

  // ── Panel-specific tokens — namespaced per ORIGINATING PANEL. Each panel's
  // tailwind-preset imports `core` + only its own slice here. Adding a new
  // panel-specific color should NEVER require touching `core` or bumping other
  // panels' effective palette.
  //
  // Shape per panel: { rawColors, themeExtensions?, colorsSemanticExtension? }
  //   rawColors               → flat color values/scales, merged into theme.extend.colors
  //   themeExtensions         → derived groups (like core's mainBrand/secondaryBrand
  //                             pattern) specific to this panel, e.g. fsBizPanel's
  //                             `assessment`/`ojt` groups for Test/Survey + OJT tag types
  //   colorsSemanticExtension → deep-merged into core's colorsSemantic.{light,dark}.*
  //                             for panel-specific semantic states (e.g. fsBizPanel's
  //                             openEnded/choice/apprenticeship/etc.)
  apps: {
    fsContentPanel: {
      rawColors: {
        classroom: '#C4A9FF',
        classroomOnsite: '#0fa73a4d',
        classroomOnline: '#edb50066',
        tagClassroomOnline: '#3D67FD',
        tagClassroomOnSite: '#ED8F0A',
        learningPath: '#93C4FF',
        information: '#1A74A8',
        body: '#161c27',
        'sub-table': '#05080C',
        ci: { 1: '#0A0F18' },
        embledlink: '#FFE088',
      },
    },
    // CONFIRMED as fs-biz-panel's actual current tailwind.config.js (not
    // fs-assessment-panel, despite the Assessment/OJT-flavored comments inside it —
    // those refer to feature/tag names fs-biz-panel manages, not the panel's own name).
    fsBizPanel: {
      rawColors: {
        // Identical to fs-content-panel's full classroom-family set — this panel's real
        // config now carries the FULL set (not just classroom/embledlink/body as in the
        // older v2 file), suggesting these may be trending toward `core`. NOT promoted
        // yet — flag raised, needs explicit team decision (2/3 panels now use identical
        // full sets, which is a stronger signal than before).
        classroom: '#C4A9FF',
        classroomOnsite: '#0fa73a4d',
        classroomOnline: '#edb50066',
        tagClassroomOnline: '#3D67FD',
        tagClassroomOnSite: '#ED8F0A',
        learningPath: '#93C4FF',
        information: '#1A74A8',
        body: '#161c27',
        'sub-table': '#05080C',
        ci: { 1: '#0A0F18' },
        embledlink: '#FFE088',
        // fs-biz-panel-only, from the older v2 file:
        lbody: '#E8EAEC',
        fscourse: '#FF63A8',
        fsSubCategory: '#FC3287',
        // New in this revision — used for Test/Survey Assessment + OJT tag types:
        blueViolet: { 50: '#EDE7F6', 500: '#472CDD' },  // Assessment: Open-ended tag
        burntOrange: { 500: '#DB7725' },                 // Assessment: Choice tag
        forestGreen: { 50: '#E8F5E9', 500: '#3B6D11' },  // OJT: Apprenticeship tag
        vividGreen: { 50: '#E5F6EA', 500: '#00B35A' },   // OJT: Orientation tag
      },
      themeExtensions: {
        assessment: {
          openEnded: {
            50: 'color-mix(in srgb, var(--color-blueViolet-500) 5%, transparent)',
            200: 'color-mix(in srgb, var(--color-blueViolet-500) 20%, transparent)',
            1000: 'color-mix(in srgb, var(--color-blueViolet-500) 100%, transparent)',
          },
          choice: {
            50: 'color-mix(in srgb, var(--color-burntOrange-500) 5%, transparent)',
            200: 'color-mix(in srgb, var(--color-burntOrange-500) 20%, transparent)',
            1000: 'color-mix(in srgb, var(--color-burntOrange-500) 100%, transparent)',
          },
        },
        ojt: {
          apprenticeship: { 50: 'var(--color-forestGreen-50)', 1000: 'var(--color-forestGreen-500)' },
          orientation: { 50: 'var(--color-vividGreen-50)', 1000: 'var(--color-vividGreen-500)' },
          simulatedTraining: { 50: 'var(--color-blueViolet-50)', 1000: 'var(--color-blueViolet-500)' },
          crossTraining: { 50: 'var(--color-info-50)', 1000: 'var(--color-info-500)' },
        },
      },
      // Deep-merged into core.themeExtensions.colorsSemantic for this panel only.
      colorsSemanticExtension: {
        light: {
          text: {
            openEnded: 'assessment.openEnded.1000', choice: 'assessment.choice.1000',
            apprenticeship: 'ojt.apprenticeship.1000', orientation: 'ojt.orientation.1000',
            simulatedTraining: 'ojt.simulatedTraining.1000', crossTraining: 'ojt.crossTraining.1000',
          },
          stroke: { openEnded: 'assessment.openEnded.200', choice: 'assessment.choice.200' },
          icon: {
            apprenticeship: 'ojt.apprenticeship.1000', orientation: 'ojt.orientation.1000',
            simulatedTraining: 'ojt.simulatedTraining.1000', crossTraining: 'ojt.crossTraining.1000',
          },
          fill: {
            openEnded: 'assessment.openEnded.50', choice: 'assessment.choice.50',
            apprenticeship: 'ojt.apprenticeship.50', orientation: 'ojt.orientation.50',
            simulatedTraining: 'ojt.simulatedTraining.50', crossTraining: 'ojt.crossTraining.50',
          },
        },
        dark: {
          text: {
            openEnded: 'assessment.openEnded.1000', choice: 'assessment.choice.1000',
            apprenticeship: 'ojt.apprenticeship.1000', orientation: 'ojt.orientation.1000',
            simulatedTraining: 'ojt.simulatedTraining.1000', crossTraining: 'ojt.crossTraining.1000',
          },
          stroke: { openEnded: 'assessment.openEnded.200', choice: 'assessment.choice.200' },
          icon: {
            apprenticeship: 'ojt.apprenticeship.1000', orientation: 'ojt.orientation.1000',
            simulatedTraining: 'ojt.simulatedTraining.1000', crossTraining: 'ojt.crossTraining.1000',
          },
          fill: {
            openEnded: 'assessment.openEnded.50', choice: 'assessment.choice.50',
            apprenticeship: 'ojt.apprenticeship.50', orientation: 'ojt.orientation.50',
            simulatedTraining: 'ojt.simulatedTraining.50', crossTraining: 'ojt.crossTraining.50',
          },
        },
        // NOTE: values above are STRING PATHS ("assessment.openEnded.1000"), resolved by
        // tailwind-preset.js against this panel's own `themeExtensions`, not raw hex —
        // keeps this data panel-agnostic and avoids duplicating hex a 3rd time.
      },
    },
    fsAssessmentPanel: {
      rawColors: {
        lightBG: { 100: '#F9F9FE' },
        setting: { 100: '#FCF9FF' },
      },
    },
    // featureReleaseHub: {}, // reserved — separate product outside FutureSkill;
    //                        // add its panel-specific colors here if any emerge
  },
};