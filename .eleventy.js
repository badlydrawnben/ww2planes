const htmlmin = require("html-minifier");
const pluginCloudinaryImage = require( "eleventy-plugin-cloudinary" );

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./src/style.css");
  eleventyConfig.addWatchTarget("./styles/tailwind.css");
  // eleventyConfig.addPassthroughCopy({ "./dist/style.css": "./style.css" });
  eleventyConfig.addPassthroughCopy( "./src/images/");

  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
  });

  eleventyConfig.addPassthroughCopy({
    "./src/js/filter-planes.js": "./js/filter-planes.js",
  });

  eleventyConfig.addPassthroughCopy('admin'); // Netlify CMS

  eleventyConfig.cloudinaryCloudName = 'badlydrawnben'
  eleventyConfig.addShortcode('cloudinaryImage', function (path, transforms, alt) {
    return `<img src="https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/${transforms}/${path}" alt="${alt}">`
  })

  eleventyConfig.addPlugin( pluginCloudinaryImage )


  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  // Returns a collection of planes in reverse date order
//   eleventyConfig.addCollection('planes', collection => {
//   return [...collection.getFilteredByGlob('./planes/*.md')].reverse();
// });

 // Returns a collection of planes in country order
 eleventyConfig.addCollection('planes', collection => {
  return collection.getFilteredByGlob('./planes/*.md').sort((a, b) => {
    return (a.data.country) > (b.data.country) ? 1 : -1;
  });
});

 // Returns a collection of planes in speed order
//  eleventyConfig.addCollection('planes', collection => {
//   return collection.getFilteredByGlob('./planes/*.md').sort((a, b) => {
//     return Number(a.data.maxspeed) < Number(b.data.maxspeed) ? 1 : -1;
//   });
// });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });
  return {
    dir: {
      input: '.',
      output: 'dist',
    }
  };
};

