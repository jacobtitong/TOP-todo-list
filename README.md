# Web-Project-Template

A repository containing my preferred default setup when making a new web project.

## Credits

1. [reset.css](src/reset.css) is a direct copy of [Josh Comeau](https://www.joshwcomeau.com/about-josh/)'s [Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/). Although I added a new addition to it [(line 27)](src/reset.css) by making the body element have a default style of the user's operating system which is based around [Geoff Graham](https://css-tricks.com/author/geoffgraham/)'s [System Font Stack](https://css-tricks.com/snippets/css/system-font-stack/).
2. [README-template.md](README-template.md) is based around [Frontend Mentor](https://www.frontendmentor.io/)'s challenge template for README.md files.
3. [package.json](package.json) uses the default setup for initializing _npm_. Its [scripts and devDependencies](package.json) are compiled based on [The Odin Project](https://www.theodinproject.com/)'s recommendations for setting up webpack through these lessons: (1) [Webpack](https://www.theodinproject.com/lessons/javascript-webpack), and (2) [Revisiting Webpack](https://www.theodinproject.com/lessons/node-path-javascript-revisiting-webpack).
4. [webpack.common.js](webpack.common.js), [webpack.dev.js](webpack.dev.js), and [webpack.prod.js](webpack.prod.js) are files that are configured based around [Webpack's "Production" guide](https://webpack.js.org/guides/production/).
