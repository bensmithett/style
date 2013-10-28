# style

A starting point for a scalable, maintainable CSS architecture.

- [Compass](http://compass-style.org/) with [vertical rhythm](http://compass-style.org/reference/compass/typography/vertical_rhythm/)
- [SMACSS](http://smacss.com/) modules with [BEM](http://bem.info/method/) syntax for modifiers & subcomponents
- A [Susy](http://susy.oddbird.net/) mobile-first responsive grid module
- [Normalize.css](http://necolas.github.com/normalize.css/)
- Standalone stylesheet for IE < 9

You might choose to replace Compass & Susy with [Bourbon](http://bourbon.io/) & [Neat](http://neat.bourbon.io/) or your own alternatives.

I wrote a [blog post](http://webuild.envato.com/blog/how-to-scale-and-maintain-legacy-css-with-sass-and-smacss/) explaining how we use this approach on the Envato [marketplaces](http://themeforest.net).

## Getting started
Assuming you have your own plans for asset compilation, you'll probably just want to drop the `stylesheets` folder into your usual stylesheets path (note the dependencies in the `Gemfile` and Compass configuration in `config.rb`).

That said, you can run this as a standalone Compass project if you wish.

1. `bundle install`
- `compass watch` or `compass compile` to compile CSS to `css/`

## Modules
With the exception of [base element styles](https://github.com/bensmithett/style/tree/master/stylesheets/base) & [global state classes](https://github.com/bensmithett/style/blob/master/stylesheets/_state.sass), everything is a module. Modules are standalone, reusable components that have no knowledge of their parent container. Their only dependencies are the app’s base styles.

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

// A modified fancy-widget
.fancy-widget--important
  @extend .fancy-widget
  font-weight: bold

// Hey look, module-specific states are just modifiers too! 
// The "is" keyword indicates that this is a state class.
.fancy-widget--is-loading
  background: url(spinner.gif)
  
  // It's up to you whether you add modifier classes on top of the module class...
  // <b class="fancy-widget fancy-widget--is-loading">
  // or @extend the original so you can replace it...
  // <b class="fancy-widget--is-loading">
  //
  // I still haven't decided which approach I like better.

// Sometimes it's easier to update a  single state attribute with JS instead of
// faffing about with adding & removing state classes. That's ok.
.fancy-widget[data-state=is-loading]
  background: url(spinner.gif)

// A subcomponent (some component that must be a child of .fancy-widget)
// Generally subcomponent classes exist purely to position an element inside the module.
// Whatever is inside a subcomponent can usually be extracted out into its own module.
.fancy-widget__close-button
  margin-left: 20px
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
