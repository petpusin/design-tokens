/**
 * Usage:
 *   const createPreset = require('@petpusin/design-tokens/tailwind-preset');
 *   module.exports = { presets: [createPreset('fsBizPanel')], content: [...] };
 *   // or createPreset() for core-only (no panel-specific tokens)
 *
 * ⚠️ Requires these CSS custom properties to be defined somewhere in the consuming
 * app's global CSS (used by color-mix() values below):
 *   --color-primary-500, --color-primary-300  (mainBrand)
 *   --color-deepPink-500, --color-deepPink-300 (secondaryBrand)
 *   --color-neutral-50                         (basicBase.dark)
 *   --color-blueViolet-500, --color-burntOrange-500,
 *   --color-forestGreen-50/500, --color-vividGreen-50/500,
 *   --color-info-50/500                        (fsBizPanel's assessment/ojt only)
 * This package does NOT currently ship that CSS — see colors.js header, "OPEN QUESTION".
 *
 * ⚠️ colorsSemantic is precomputed as a plain object, NOT a Tailwind theme() callback —
 * verified by build test that Tailwind v3 doesn't invoke functions nested as a colors
 * sub-key (see project notes / chat history for the full mechanism explanation).
 */
const tokens = require('./colors');

// Resolve a dotted string path like "assessment.openEnded.1000" against an object.
function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

// Deep-merge b into a (mutates a copy, doesn't mutate inputs). Simple recursive merge,
// good enough for our known-shape semantic objects (no arrays involved).
function deepMerge(a, b) {
  const out = { ...a };
  for (const key of Object.keys(b)) {
    if (b[key] && typeof b[key] === 'object' && !Array.isArray(b[key]) && a[key]) {
      out[key] = deepMerge(a[key], b[key]);
    } else {
      out[key] = b[key];
    }
  }
  return out;
}

// Resolve a colorsSemanticExtension block's string-path values against the panel's own
// themeExtensions (e.g. "assessment.openEnded.1000" → actual hex/color-mix string).
function resolveSemanticExtension(extension, panelThemeExtensions) {
  const resolved = {};
  for (const themeKey of Object.keys(extension)) {
    resolved[themeKey] = {};
    for (const category of Object.keys(extension[themeKey])) {
      resolved[themeKey][category] = {};
      for (const [name, path] of Object.entries(extension[themeKey][category])) {
        resolved[themeKey][category][name] = resolvePath(panelThemeExtensions, path);
      }
    }
  }
  return resolved;
}

module.exports = function createPreset(appName) {
  const app = appName ? tokens.apps[appName] : undefined;
  if (appName && !app) {
    throw new Error(
      `[design-tokens] Unknown app namespace "${appName}". ` +
      `Available: ${Object.keys(tokens.apps).join(', ') || '(none defined yet)'}`
    );
  }

  const raw = tokens.core.raw;
  const semantic = tokens.core.semantic;
  const ext = tokens.core.themeExtensions;
  const neutralSolid = ext.neutralSolid(raw);
  const appRaw = app?.rawColors || {};
  const appThemeExt = app?.themeExtensions || {};

  // Base colorsSemantic (core only) — same structure verified against real build in
  // earlier revision. Panel-specific extensions get deep-merged in below if present.
  let colorsSemantic = {
    light: {
      text: {
        strong: ext.basicBase.light[1000], weak: ext.basicBase.light[700],
        brand: ext.mainBrand.light[1000], secondaryBrand: ext.secondaryBrand.light[1000],
        disabled: ext.basicBase.light[100], error: raw.red[700],
        warning: raw.yellow[700], success: raw.green[700],
        inverseStrong: raw.neutral[50], inverseWeak: 'rgba(25, 25, 25, 0.78)',
        inverseDisabled: ext.basicBase.dark[100], progressInCard: raw.neutralSecondary[400],
      },
      stroke: {
        strong: ext.basicBase.light[500], weak: ext.basicBase.light[100],
        selected: ext.mainBrand.light[1000], focus: ext.mainBrand.light[1000],
        disabled: ext.basicBase.light[100], brandStrong: ext.mainBrand.light[800],
        brandWeak: ext.mainBrand.light[200], secondaryBrandStrong: ext.secondaryBrand.light[800],
        secondaryBrandWeak: ext.secondaryBrand.light[200], errorStrong: raw.red[500],
        errorWeak: 'rgba(255, 55, 51, 0.2)', warningStrong: raw.yellow[500],
        warningWeak: 'rgba(237, 181, 0, 0.2)', successStrong: raw.green[500],
        successWeak: 'rgba(0, 179, 90, 0.2)', inverseStrong: ext.basicBase.dark[500],
        inverseWeak: ext.basicBase.dark[100], inverseDisabled: ext.basicBase.dark[100],
      },
      icon: {
        neutral: ext.basicBase.light[700], brand: ext.mainBrand.light[800],
        secondaryBrand: ext.secondaryBrand.light[800], disabled: ext.basicBase.light[100],
        error: raw.red[500], warning: raw.yellow[500], success: raw.green[500],
        inverse: ext.basicBase.light[500], inverseStrong: raw.neutral[50],
        inverseDisabled: ext.basicBase.dark[100],
      },
      fill: {
        strong: ext.basicBase.light[1000], weak: ext.basicBase.light[50],
        weaker: ext.basicBase.light[25], hover: ext.basicBase.light[50],
        click: ext.basicBase.light[100], selected: ext.mainBrand.light[1000],
        disabled: ext.basicBase.light[100], overlay: ext.basicBase.light[500],
        brandStrong: ext.mainBrand.light[1000], brandWeak: ext.mainBrand.light[50],
        secondaryBrandStrong: ext.secondaryBrand.light[1000], secondaryBrandWeak: ext.secondaryBrand.light[50],
        errorStrong: raw.red[500], errorWeak: 'rgba(255, 55, 51, 0.05)',
        warningStrong: raw.yellow[500], warningWeak: 'rgba(237, 181, 0, 0.05)',
        successStrong: raw.green[500], successWeak: 'rgba(0, 179, 90, 0.05)',
        inverseStrong: raw.neutral[50], inverseWeak: ext.basicBase.dark[50],
        inverseHover: ext.basicBase.dark[50], inversePress: ext.basicBase.dark[100],
        inverseDisabled: ext.basicBase.dark[100], white: raw.neutral[50],
      },
      background: {
        base: raw.neutral[50], raised: raw.neutral[50], overlay: raw.neutral[50],
        sunken: raw.neutral[100], alternate: raw.neutral[100],
        brand: ext.mainBrand.light[1000], inverse: raw.neutralAnalogous[900],
      },
    },
    dark: {
      text: {
        strong: raw.neutral[50], weak: ext.basicBase.dark[700],
        brand: ext.mainBrand.dark[1000], secondaryBrand: ext.secondaryBrand.dark[1000],
        disabled: ext.basicBase.dark[100], error: raw.red[200],
        warning: raw.yellow[200], success: raw.green[200],
        inverseStrong: ext.basicBase.light[1000], inverseWeak: ext.basicBase.light[700],
        inverseDisabled: ext.basicBase.light[100], progressInCard: raw.neutralSecondary[100],
      },
      stroke: {
        strong: ext.basicBase.dark[500], weak: ext.basicBase.dark[100],
        selected: ext.mainBrand.dark[1000], focus: ext.mainBrand.dark[1000],
        disabled: ext.basicBase.dark[100], brandStrong: ext.mainBrand.dark[800],
        brandWeak: ext.mainBrand.dark[200], secondaryBrandStrong: ext.secondaryBrand.dark[800],
        secondaryBrandWeak: ext.secondaryBrand.dark[200], errorStrong: raw.red[200],
        errorWeak: 'rgba(249, 154, 155, 0.2)', warningStrong: raw.yellow[200],
        warningWeak: 'rgba(245, 217, 124, 0.2)', successStrong: raw.green[200],
        successWeak: 'rgba(152, 217, 172, 0.2)', inverseStrong: ext.basicBase.light[500],
        inverseWeak: ext.basicBase.light[100], inverseDisabled: ext.basicBase.light[100],
      },
      icon: {
        neutral: ext.basicBase.dark[500], brand: ext.mainBrand.dark[800],
        secondaryBrand: ext.secondaryBrand.dark[800], disabled: ext.basicBase.dark[100],
        error: raw.red[200], warning: raw.yellow[200], success: raw.green[200],
        inverse: ext.basicBase.light[500], inverseStrong: ext.basicBase.light[1000],
        inverseDisabled: ext.basicBase.light[100],
      },
      fill: {
        strong: raw.neutral[50], weak: ext.basicBase.dark[50],
        weaker: ext.basicBase.dark[25], hover: ext.basicBase.dark[50],
        click: ext.basicBase.dark[100], selected: raw.purpleDeep[500],
        disabled: ext.basicBase.dark[100], overlay: ext.basicBase.dark[700],
        brandStrong: raw.purpleDeep[500],
      },
      background: {
        base: raw.neutralAnalogous[900], raised: ext.secondaryBrand.dark[1000],
        overlay: ext.secondaryBrand.dark[1000], sunken: raw.neutralNoble[900],
        alternate: ext.secondaryBrand.dark[800], brand: raw.purpleDeep[500],
        inverse: raw.neutral[50],
      },
    },
  };

  // Merge in this panel's colorsSemanticExtension, if any (e.g. fsBizPanel's
  // openEnded/choice/apprenticeship/etc.) — resolved against its own themeExtensions.
  if (app?.colorsSemanticExtension) {
    const resolvedExt = resolveSemanticExtension(app.colorsSemanticExtension, appThemeExt);
    colorsSemantic = deepMerge(colorsSemantic, resolvedExt);
  }

  return {
    theme: {
      extend: {
        colors: {
          ...raw,
          ...appRaw,
          // Merge the numbered CSS-var scale (bg-primary-500 etc, live theme-switchable)
          // with the named semantic states (bg-primary, bg-primary-hover, etc, hardcoded
          // hex) into ONE `primary` key — Tailwind allows mixing numeric and named keys
          // in the same color object (we already do this for `black`, `yellow`, etc).
          primary: { ...raw.primary, ...semantic.primary },
          background: semantic.background,
          foreground: semantic.foreground,
          mainBrand: ext.mainBrand,
          secondaryBrand: ext.secondaryBrand,
          neutralSolid,
          basicBase: ext.basicBase,
          ...appThemeExt, // e.g. fsBizPanel's `assessment` and `ojt` groups
          colorsSemantic,
        },
      },
    },
  };
};