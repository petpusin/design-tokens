const { raw, semantic } = require('./colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        ...raw,
        primary: semantic.primary,
        background: semantic.background,
        foreground: semantic.foreground,
      },
    },
  },
};
