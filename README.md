# Style

An opinionated starting point for scalable, maintainable CSS architecture.

- [Sass](http://sass-lang.com/) ([node-sass](https://github.com/sass/node-sass) 3.3)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Sanitize.css](https://10up.github.io/sanitize.css/)
- [Metaquery](https://github.com/benschwarz/metaquery)
- [SMACSS](http://smacss.com/)-style components written with [BEVM](http://webuild.envato.com/blog/chainable-bem-modifiers/) syntax
- Example build pipelines for [Gulp](http://gulpjs.com/) & [Webpack](https://webpack.github.io/)

Style is an approach to writing CSS [born](http://webuild.envato.com/blog/how-to-scale-and-maintain-legacy-css-with-sass-and-smacss/) & [refined](http://market.envato.com/) over several years at [Envato](http://www.envato.com/) by the team responsible for maintaining & evolving the 9 year old Rails codebase that powers [Envato Market](http://market.envato.com/).

## Should you use it?

If you're starting a new project today, especially a JavaScript-heavy project, I'd strongly recommend investigating [CSS Modules](http://glenmaddern.com/articles/css-modules).

However Style's approach might be a better option in some cases:

- Views or templates authored in something other than JavaScript (e.g. PHP, [Twig](http://twig.sensiolabs.org/), [ERB](http://apidock.com/ruby/ERB), [Slim](http://slim-lang.com/), etc)
- Maintaining an existing CSS or Sass codebase
- Simple static site projects

## Getting started

Style is designed as a starting point to work with your own asset build process (eg an [asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html), [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/) task). Just drop the `stylesheets` folder into your app & start styling!

Example build configurations are provided for Gulp & Webpack (see below for how to use them).

## General principles

#### Every Sass file is compiled in isolation

JavaScript modules have shown us the benefits of small, independent files with explicitly declared dependencies rather than relying on lots of global variables.

Sass can be written the same way. In Style, every Sass file must explicitly `@import` any variables, functions or mixins that it uses. There is no global Sass context shared between files. Each file is compiled to CSS in isolation before being packaged into the final bundle.

[Read more about this approach](http://bensmithett.com/smarter-css-builds-with-webpack/#no-global-sass-context).

#### The component paradigm

Style embraces the component paradigm, roughly as defined by [SMACSS Modules](https://smacss.com/book/type-module). [SUIT](https://github.com/suitcss/suit/) components, [OOCSS](https://github.com/stubbornella/oocss) components & [BEM](https://en.bem.info/method/definitions/) blocks are all in the same ballpark.

There are other CSS paradigms not centered around components such as [AMCSS](https://amcss.github.io/) & [Tachyons](http://tachyons.io/), each with their own merits, but I've found components easiest to work with.

## Style categories

Files in the `stylesheets` folder are divided into several categories:

### `base`

`base` contains the styles that all other styles are built upon. They are an implicit dependency of all your other styles - changing your reset styles will have a flow-on effect to all other styles, so in general they should not be changed once you start.

`@font-face` & `@keyframe` declarations are also kept here.

### `components`

A component:

- Is defined in its own file (eg `components/my_component.sass`)
- Is **independent**, **reusable** & **disposable**.
- Implicitly depends only on your base styles (in this case, Sanitize.css + the small number of additional styles set in `base`)
- Has no knowledge of its context (i.e. doesn't depend on styles from a particular parent element - it can be rendered anywhere)
- Minimises its own [depth of applicability](http://smacss.com/book/applicability) so that it can safely contain other modules
- Has no context-specific size or position styles. Read [Objects in Space](https://medium.com/objects-in-space/f6f404727) for more on this.

#### Simple component

Here's what a simple component, `components/simple_component.sass`, might look like:

```sass
.simple-component
  color: goldenrod
```

#### Complex component

Here's a slightly more complex component, `modules/comment.sass`:

```sass
@import 'config/colors'

.comment
  color: $fuchsia

  // Modifier classes can be used to modify a components styles for special cases
  // and different states
  &.-is-loading
    background: url(spinner.gif)

  &.-staff-comment
    font-weight: bold

// A subcomponent (some component that *must* be a child of .comment)
.comment__avatar
  margin-left: 20px
  width: 100px
// Whatever is inside a subcomponent can usually be extracted out into its own component,
// with the subcomponent simply being used to size & position a generic container.
// In this case, .comment__avatar is a container for a separate .avatar component.
```

Read [Chainable BEM modifiers](http://webuild.envato.com/blog/chainable-bem-modifiers/) for a thorough explanation of the syntax used here for classes.

#### `grid` and `layout-box`

The included `grid` and `layout-box` are a good state for most layout needs, but feel free to replace them!

### `config`

Config files define configuration variables (e.g. colors, font stacks, common sizes). They don't output any CSS of their own, but should be imported into Sass files that do using `@import`.

### `functions` and `mixins`

Sass functions & mixins intended to be imported into other Sass files using `@import` & used to output some CSS.

### `type`

I've found that typography styles are a bit special. They're not quite component styles and they're not quite reset styles. The following use cases are common:

- Styling a big block of raw HTML that has no classes (e.g. rendered from Markdown)
- Applying your base typography styles to an element in a one-off situation (e.g. styling a heading that appears inside another component)

Each Sass file in `type` defines some styles under a class (e.g. `.type-heading`) as well as applying those same styles to class-free elements that appear inside a `type-raw-html` block (e.g. `.type-raw-html h1`).

### `utilities`

Utilities are borrowed directly from [SUIT](https://github.com/suitcss/suit/blob/master/doc/utilities.md). They are helper classes that define common utility styles and can be used anywhere on any element.

`!important` is OK in utility classes, as you'll usually want them to override a component's styles. E.g., I'd always expect `.u-hidden` to hide an element even if it also has component class that specifies `display: block`.

I tend to use them sparingly. Don't be afraid to write `float: left` in a component even if you have a utility class that does the same thing. Instead of using utility classes to avoid duplicating any styles, use them in situations where you would otherwise need to define a whole new component.

## Responsive design & Metaquery

[Writing media queries in CSS is for chumps.](http://glenmaddern.com/articles/metaquery-and-the-end-of-media-queries) Style uses [metaquery](https://github.com/benschwarz/metaquery) so you can use named breakpoint classes in your CSS.

```
.my-component
  color: red

  .breakpoint-tablet &
    color: blue

  .breakpoint-widescreen &
    color: fuchsia
```

Some example breakpoints are defined in `index.html`.

## Build examples

Style includes some fairly minimal examples you can use to build a final `app.css` stylesheet from the source files.

You'll need [Node.js](https://nodejs.org/en/) - I recommend installing it with [nodenv](https://github.com/OiNutter/nodenv).

The `devDependencies` in `package.json` are grouped by build tool (no comments in JSON 😿) - feel free to delete the dependencies you don't need.

The output CSS can be inspected in `css/app.css` or you can open `index.html` in a browser to see it in action.

Pull requests for examples for other build tools are welcome!

### Gulp

- Install dependencies by running `npm install` in your terminal
- Run a single build with `npm run gulp`
- Watch & automatically recompile when you change a Sass file with `npm run gulp:watch`

### Webpack

- Install dependencies by running `npm install` in your terminal
- Run a single build with `npm run webpack`
- Watch & automatically recompile when you change a Sass file with `npm run webpack:watch`

[Read about using Webpack to build CSS](http://bensmithett.com/smarter-css-builds-with-webpack/).
