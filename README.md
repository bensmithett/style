# style

A starting point for a scalable, maintainable CSS architecture.

- [Compass](http://compass-style.org/) with [vertical rhythm](http://compass-style.org/reference/compass/typography/vertical_rhythm/)
- [SMACSS](http://smacss.com/) with [BEM](http://bem.info/method/)-inspired syntax for modifiers & subcomponents
- Mobile first responsive grid with [Susy](http://susy.oddbird.net/)
- [Normalize.css](http://necolas.github.com/normalize.css/)
- A standalone stylesheet for old IE generated from the same Sass.

## Getting started
Assuming you have your own plans for asset compilation, you'll probably just want to drop the `stylesheets` folder into your usual stylesheets path (note the dependencies in the `Gemfile` and Compass configuration in `config.rb`).

That said, you can run this as a standalone Compass project if you wish.

1. `bundle install`
- `compass watch` or `compass compile` to compile CSS to `css/`

## Module syntax
Here's what an example module, `/stylesheets/modules/_example_widget.sass`, might look like: 
```sass
@mixin example-mixin
  // A mixin to be used in this module
  // If you have a mixin that will be reused in other modules, put it
  // in _global_mixins.sass

.example-widget
  // A module definition

  // If you have --modifier versions of this module (see below)
  // consider extracting common bits out into a %placeholder
  // class and @extend-ing.

.example-widget--modifier
  @extend .example-widget   
  // or @extend %example-widget

  // Extends the root module to create a different
  // standalone module, e.g. .example-widget--large
  
  // Only @extend within modules. @extend-ing across modules
  // defeats the purpose of strictly isolating a module in its own file.

.example-widget__subcomponent
  // A subcomponent of an .example-widget module.
  // e.g. .example-widget__close-button

.example-widget--is-somestate
  // A state specific to this module.

  // This class is applied on top of the module class (e.g. via JS)
  // so doesn't need to @extend the original module.

  // So the HTML looks like
  // <b class="example-widget example-widget--is-somestate">
```

## IE-specific styles
Keep IE specific declarations with the selector they belong to, but only output them in a seperate `oldie.css` that is included with conditional comments ([hat tip](http://jakearchibald.github.com/sass-ie/)).

```sass
p
  color: #f00
  
  @if $oldie
    position: relative
    zoom: 1
```

Theoretically this techinique isn't limited to IE - you could create all sorts of client-specific stylesheets as long as you have a way to conditionally load the right one.

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
