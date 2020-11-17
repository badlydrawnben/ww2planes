module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [".src/**/*.md"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container:{
      center: true,
    },
    extend: {
      colors: {
        change: "black",
      },
    },
  },
  variants: {},
  plugins: [],
};
