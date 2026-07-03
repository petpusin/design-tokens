/**
 * CONSOLIDATED DRAFT — merged from 3 source files:
 *   A = tailwindColors.js (v1, likely oldest)
 *   B = tailwindColors.js (v2)
 *   C = colors.js (FutureSkill, "FS" suffix, has inline usage comments — most useful for semantic mapping)
 *
 * Groups marked ⚠️ CONFLICT have different values across sources — a value was picked
 * but MUST be confirmed by design/eng before this becomes the real v1.0.0. Do not
 * silently trust the picked value.
 */
module.exports = {
  raw: {
    // ── Identical across all sources — safe, no decision needed ──
    neutralPrimary: {
      50: '#ffffff', 100: '#fafafa', 200: '#f5f5f5', 300: '#f4f6f9',
      400: '#d9d9d9', 500: '#bfbfbf', 600: '#8c8c8c', 700: '#595959',
      800: '#262626', 900: '#0a0f18',
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

    // was `purple` (A,B) === `primaryFS` (C) — literally identical, confirmed brand primary
    purpleBrand: {
      50: '#F1E7FB', 100: '#DBC5F5', 200: '#C39EEF', 300: '#AB74E9',
      400: '#9852E3', 500: '#842CDD', 600: '#7A27D6', 700: '#6C1CCD',
      800: '#5E13C7', 900: '#4900B9',
    },

    // ⚠️ CONFLICT: A uses a totally different (brighter) violet than B/C.
    // B and C agree on the family but have 3 independent typos between them.
    // Value below = C's version with B's typos NOT applied (i.e. corrected toward
    // what looks like the intended pattern). CONFIRM against actual design file.
    purpleDeep: {
      50: '#F0E6F2', 100: '#DAC1DF', 200: '#C398CB', 300: '#AB72B5',
      400: '#9957A5', // A had '#b485ff' (different family), B had '#995745' (likely typo)
      500: '#884196',
      600: '#7C3C8F', // B had '#7C3CBF' (likely typo)
      700: '#6C3585', 800: '#5D307B', 900: '#442767',
      _conflictNote: 'A.purpleDeep was a different color family entirely (#975DFF base) — likely stale/pre-rebrand. Confirm 400/600 hex against current Figma before publishing.',
    },

    pinkBrand: {
      50: '#fbe3eb', 100: '#f6b9ce', 200: '#f08cae', 300: '#eb5e8f',
      400: '#e63a76', 500: '#e2105f', 600: '#d10e5c', 700: '#bc0c57',
      800: '#a70853', 900: '#82044b',
    },

    greenBrand: {
      50: '#e5f6ea', 100: '#c1e8cc', 200: '#98d9ac', 300: '#6aca8b',
      400: '#44bf72', 500: '#00b35A', 600: '#00a450', 700: '#009244',
      800: '#008038', 900: '#006124',
    },

    // ⚠️ CONFLICT (minor): B/C agree closely (own typo at .100), A is older values.
    // Using B/C consensus below.
    yellowBrand: {
      50: '#fdf6df', 100: '#f9e8af', 200: '#f5d97c', 300: '#f1cc46',
      400: '#efc018', 500: '#edb500', 600: '#eda800', 700: '#ed9600',
      800: '#ed8500', 900: '#ed6500', status: '#FFE2AA',
      _conflictNote: 'A used 50:#fffce6 / 100:#fff2a8 (older). B/C.100 differ by one hex digit from each other (F9EBAF vs f9e8af) — confirm exact value.',
    },

    // ⚠️ CONFLICT: A and C agree on .400 (#ff3733), B has a distinct outlier value.
    redBrand: {
      50: '#ffebef', 100: '#ffcdd4', 200: '#f99a9b', 300: '#ff4d50',
      400: '#ff3733', 500: '#ff3733', 600: '#f72d34', 700: '#e41f2d',
      800: '#d71426', 900: '#c80019',
      _conflictNote: 'B used 400:#E9423E — outlier vs A and C which agree. Likely B drifted; confirm before trusting.',
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
    orangeBrand: {
      50: '#fff6e6', 100: '#ffe3ba', 200: '#ffcf91', 300: '#ffb969',
      400: '#ff9f40', 500: '#FD8116', 600: '#d66209', 700: '#b04600',
      800: '#8a3200', 900: '#632100',
    },
    orangeRed: {
      50: '#fff6f0', 100: '#ffdec9', 200: '#ffc2a1', 300: '#ffa378',
      400: '#fc804e', 500: '#F05623', 600: '#c93b14', 700: '#a32508',
      800: '#7d1300', 900: '#570a00',
    },
    violetBrand: {
      50: '#f4edff', 100: '#d8c4ff', 200: '#b99cff', 300: '#9873ff',
      400: '#744aff', 500: '#4E20FF', 600: '#3311d9', 700: '#1c05b3',
      800: '#0e008c', 900: '#070066',
    },
    blueBrand: {
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
    cyanBrand: {
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
    blackBrand: {
      body: '#F2F3F4', 100: '#FFFFFF', 200: '#E6E6EA', 300: '#BCBCC0',
      400: '#7E7E82', 500: '#2E2E30', 600: '#212129', 700: '#171722',
      800: '#0E0E1B', 900: '#080817',
    },

    // ⚠️ CONFLICT on `input2` only — everything else agreed between A/B.
    // Kept B's fuller key set (input-disabled, upload, subtext, divide, modal, detail, info)
    // since it's a superset, not a conflict.
    dark: {
      input: '#232A37',
      input2: '#434D5D', // A had '#232A37' (same as `input` — likely A hadn't split these yet)
      'input-disabled': '#2C2E32', upload: '#DFE2E5', 'upload-icon': '#787878',
      text: '#8A94A6', text2: '#B0B7C3', subtext: '#434D5F', divide: '#2f3746',
      modal: '#3D3C41', detail: '#0A0F18', info: '#9B9B9B',
      100: '#8A8AAB', 200: '#6D6D8A', 300: '#43435C', 400: '#35354B',
      500: '#2C2C3D', 600: '#202034', 700: '#16162B', 800: '#0E0E23', 900: '#2D3E76',
      _conflictNote: 'input2 differs from `input` in B (A had them equal). Confirm intended value.',
    },

    // ── State scales (success/warning/danger) — CONFIRMED identical between A and B, zero conflict.
    // These are DISTINCT palettes from greenBrand/yellowBrand/redBrand in the source files (not aliases
    // of them) — e.g. success.400 (#41D9A2, minty) vs greenBrand.400 (#44bf72, standard green) are
    // genuinely different colors. Keep them separate; don't collapse into greenBrand/yellowBrand/redBrand.
    // DEFAULT key added (=.500) so bare `bg-success` still works, same fix pattern as the blackBrand issue.
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
  },

  // ── Semantic layer — only for concepts that AREN'T already a full raw scale.
  // success/warning/danger now live in `raw` above (with DEFAULT key), so bg-success-400,
  // bg-warning-600, bg-danger etc. all work directly — no separate semantic entry needed for them.
  semantic: {
    primary: { DEFAULT: '#842CDD', hover: '#6C1CCD', border: '#7A27D6', selectedBg: '#DBC5F5', foreground: '#ffffff' },
    background: '#ffffff',
    foreground: '#0a0f18',
  },

  // ── DEPRECATED — do not carry forward as-is ──
  // `other` bucket used numeric indices (other.1..other.12) whose meaning drifted
  // between repos (e.g. B.other.4 === A.other.3 — indices shifted, not stable identifiers).
  // ACTION REQUIRED before merge: audit every usage of `other.N` in each app, give each
  // a real semantic name, then delete this bucket entirely. Do not port it forward nameless.
};