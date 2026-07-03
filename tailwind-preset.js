const { raw, semantic } = require('./colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        ...raw,
        primary: semantic.primary,
        success: semantic.success,
        warning: semantic.warning,
        danger: semantic.danger,
        background: semantic.background,
        foreground: semantic.foreground,
      },
    },
  },
};
