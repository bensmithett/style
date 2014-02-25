# style

A starting point for a scalable, maintainable CSS architecture.

- [SMACSS](http://smacss.com/)-style modules with [BEM](http://bem.info/method/) syntax
- [autoprefixer](https://github.com/ai/autoprefixer) for vendor prefixes
- A [Susy](http://susy.oddbird.net/) mobile-first responsive grid module
- [Normalize.css](http://necolas.github.com/normalize.css/)
- [Compass](http://compass-style.org/) (for compilation & Susy only - no Compass mixins used)

You might choose to replace Compass & Susy with [Bourbon](http://bourbon.io/) & [Neat](http://neat.bourbon.io/) or your own alternatives.

I wrote a [blog post](http://webuild.envato.com/blog/how-to-scale-and-maintain-legacy-css-with-sass-and-smacss/) explaining how we use this approach on the Envato [marketplaces](http://themeforest.net).

## Getting started

Style is designed as a starting point to work with your own asset compilation process (eg an [asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html) or a [grunt](http://gruntjs.com/) or [gulp](http://gulpjs.com/) task).

You'll probably just want to drop the `stylesheets` folder into your usual stylesheets path (note the dependencies in `Gemfile` & `package.json` and configuration in `config.rb` & `gulpfile.js`).

That said, you can run this as a standalone project if you wish.

### Standalone compilation

Requires ruby, node.js and

- [bundler](http://bundler.io/): `gem install bundler`
- [gulp](http://gulpjs.com/): `npm install -g gulp`

Install local dependencies:

- `bundle install`
- `npm install`
- Run `gulp` or `gulp watch` to compile CSS into `css/`

## Modules

Modules are the core of Style's architecture. A module:

- Is defined in its own file (eg `modules/_my_module.sass`)
- Is isolated, reusable & disposable.
- Has no knowledge of its context (i.e. doesn't depend on styles from a particular parent element - it can be rendered anywhere)
- Minimises its own [depth of applicability](http://smacss.com/book/applicability) so that it can safely contain other modules
- Specifies no context-specific dimensions. It either 100% fills whatever parent container it is rendered in, or is an inline/inline-block element.

If this kind of CSS doesn't sound familiar, you may want to read these to get a bit of background:

- [SMACSS](http://smacss.com/book/categorizing)
- [How to scale and maintain legacy CSS with Sass and SMACSS](http://webuild.envato.com/blog/how-to-scale-and-maintain-legacy-css-with-sass-and-smacss/)
- [Objects in Space](https://medium.com/objects-in-space/f6f404727)

### Simple module

Here's what a simple module, `/stylesheets/modules/_simple_widget.sass`, might look like:

```sass
.simple-widget
  color: goldenrod
```

### Complex module

Here's a slightly more complex module, `/stylesheets/modules/_fancy_widget.sass`:
```sass
// The canonical fancy-widget class
.fancy-widget
  color: fuchsia

  // State is applied with a second class...
  &.is-loading
    background: url(spinner.gif)

  // ...or with a data attribute
  &[data-state=loading]
    background: url(spinner.gif)

// A modified fancy-widget
.fancy-widget--important
  @extend .fancy-widget
  font-weight: bold

// A submodule (some module that *must* be a child of .fancy-widget)
// Whatever is inside a submodule can usually be extracted out into its own module.
.fancy-widget__close-button
  margin-left: 20px
  width: 100px
```

## Media queries
Breakpoint-specific styles are kept right inside their module via Susy's [`at-breakpoint`](http://susy.oddbird.net/guides/reference/#ref-at-breakpoint) mixin.
```sass
.my-module
  color: floralwhite
  
  +at-breakpoint($tablet-and-above)
    color: plum
  
  +at-breakpoint($desktop-and-above)
    color: burlywood
```

## Internet Explorer
Like breakpoint-specific styles, IE-specific styles are kept with the selector they belong to, but are only output in a seperate `application-lt-ie9.css` stylesheet that is included with conditional comments ([hat tip](http://jakearchibald.github.com/sass-ie/)).

```sass
.my-module
  color: olive
  
  @if $lt-ie9
    position: relative
```

In `application-lt-ie9.sass` and `application-fixed.sass`, `$tablet-and-above` & `$desktop-and-above` breakpoint blocks are scoped to a `.fixed-layout` class instead of being scoped to media queries. All other breakpoints (eg `$tablet-and-below`) are discarded.

## Further reading

Ideas borrowed from many places, including:
- [SMACSS](http://smacss.com/) by Jonathan Snook
- [Clean out your Sass junk drawer](http://gist.io/4436524) by Dale Sand
- [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) by Nicolas Gallagher
- [MindBEMding - getting your head 'round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) by Harry Roberts
- [IE-friendly mobile-first CSS with Sass 3.2](http://jakearchibald.github.com/sass-ie/) by Jake Archibald
- [Organising SASS Assets in Rails](https://coderwall.com/p/bqxhxg) by Ben Taylor

## License
Style is released under the [MIT License](http://ben.mit-license.org/)
