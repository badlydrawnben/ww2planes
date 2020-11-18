const htmlmin = require("html-minifier");
const pluginCloudinaryImage = require( "eleventy-plugin-cloudinary" );

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./src/style.css");

  eleventyConfig.addPassthroughCopy({ "./src/style.css": "./style.css" });
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
  eleventyConfig.addCollection('planes', collection => {
  return [...collection.getFilteredByGlob('./src/planes/*.md')].reverse();
});

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
      input: 'src',
      output: 'dist'
    }
  };
};

