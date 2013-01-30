# style

A starting point for scalable, maintainable CSS architecture.

- [Compass](http://compass-style.org/)
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
Here's what an example module, `/stylesheets/modules/example_widget.sass`, might look like: 
```sass
@mixin example-mixin
  // A mixin to be used in this module

.example-widget
  // The module

.example-widget--modifier
  @extend .example-widget
  // Extend the root module to create a different
  // standalone module.
  // e.g. .example-widget--large

.example-widget__subcomponent
  // A subcomponent of an .example-widget module.
  // e.g. .example-widget__close-button

.example-widget--is-somestate
  // A state specific to this module.
```

I'm undecided on the wisdom of `@extend`ing the root module instead of requiring both classes in the HTML like Snook recommends in SMACSS, eg `<a class="example-widget example-widget--modifier">`.

It seems so much neater this way, but if you can see it biting me in the ass then let me know.

## Sigh... IE
Keep IE specific declarations with the selector they belong to, but only output them in a seperate `oldie.css` that is included with conditional comments ([hat tip](http://jakearchibald.github.com/sass-ie/)).

```sass
p
  color: #f00
  
  @if $oldie
    position: relative
    zoom: 1
```

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
