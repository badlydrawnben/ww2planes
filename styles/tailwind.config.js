module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./planes/*.md", "index.md", "./_includes/layouts/*.njk"],
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
