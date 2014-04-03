# style

A starting point for a scalable, maintainable CSS architecture.

- [Sass 3.3](http://sass-lang.com/)
- [autoprefixer](https://github.com/ai/autoprefixer) for vendor prefixes
- [metaquery](https://github.com/benschwarz/metaquery)
- [SMACSS](http://smacss.com/)-style modules with [BEM](http://bem.info/method/) syntax
- A [Susy 2](http://susy.oddbird.net/) mobile-first responsive grid module
- [Normalize.css](http://necolas.github.com/normalize.css/)

[Here's how we use this approach](http://webuild.envato.com/blog/how-to-scale-and-maintain-legacy-css-with-sass-and-smacss/) on the [Envato Marketplaces](http://themeforest.net).

## Getting started

Style is designed as a starting point to work with your own asset compilation process (eg an [asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html), [grunt](http://gruntjs.com/) or [gulp](http://gulpjs.com/) task).

### Use with your asset pipeline

Just drop the `stylesheets` directory into your usual stylesheets path (note the dependencies in `Gemfile`, `package.json` & `bower.json`).

### Standalone compilation

Requires ruby, node.js and [bundler](http://bundler.io/): `gem install bundler`

Install dependencies:

- `bundle install`
- `npm install`
- `bower install`
- Run `make` or `make watch` to compile CSS into `css/`

## Modules

Modules are the core of Style's architecture. A module:

- Is defined in its own file (eg `modules/_my_module.sass`)
- Is isolated, reusable & disposable.
- Has no knowledge of its context (i.e. doesn't depend on styles from a particular parent element - it can be rendered anywhere)
- Minimises its own [depth of applicability](http://smacss.com/book/applicability) so that it can safely contain other modules
- Has no context-specific dimensions. Read [Objects in Space](https://medium.com/objects-in-space/f6f404727) for more on this.

### Simple module

Here's what a simple module, `/stylesheets/modules/_simple_widget.sass`, might look like:

```sass
.simple-widget
  color: goldenrod
```

### Complex module

Here's a slightly more complex module, `/stylesheets/modules/_comment.sass`:
```sass
.comment
  color: fuchsia

  // State is applied with a second class...
  &.is-loading
    background: url(spinner.gif)

  // ...or with a data attribute
  &[data-state=loading]
    background: url(spinner.gif)

// A modified comment
.comment--important
  @extend .comment
  font-weight: bold

// A submodule (some module that *must* be a child of .comment)
// Whatever is inside a submodule can usually be extracted out into its own module.
// In this case, .comment__avatar is a container for a separate .avatar module.
.comment__avatar
  margin-left: 20px
  width: 100px
```

## Media queries
Media queries in CSS are for chumps. [Use metaquery](http://glenmaddern.com/metaquery-and-the-end-of-media-queries/) for mobile-first responsive modules:

```sass
.my-module
  color: floralwhite
  
  .breakpoint-tablet &
    color: plum
  
  .breakpoint-desktop &
    color: burlywood
```

## Grid
Style comes with a `.grid` module. It's just a [Susy](http://susydocs.oddbird.net/) container. When you put modules inside a `.grid`, you can use Susy's functions & mixins to align your module to the grid.

There are a lot, but the main one you'll use is [`span`](http://susydocs.oddbird.net/en/latest/toolkit/#span-mixin):

```sass
.page__sidebar
  +span(3 of 12)

.page__content
  +span(last 9 of 12)
```

See the included `.page` module for a responsive example.

## License
Style is released under the [MIT License](http://ben.mit-license.org/)
