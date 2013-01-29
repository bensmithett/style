# style

CSS architecture patterns that I've found myself using on every project lately. 

- [Compass](http://compass-style.org/)
- [SMACSS](http://smacss.com/) with [BEM](http://bem.info/method/)-inspired syntax for modifiers & subcomponents
- Mobile first responsive grid with [Susy](http://susy.oddbird.net/)
- [Normalize.css](http://necolas.github.com/normalize.css/)
- Seperately rendered stylesheet for Old IE

## Module syntax
```sass
.example-widget
  // Root module rules

.example-widget--modifier
  @extend .example-widget
  // Rules to extend the root module to create a different
  // standalone module.
  // e.g. .example-widget--large

.example-widget__subcomponent
  // Rules for a subcomponent of an .example-widget module.
  // It must be a child of the root module.
  // e.g. .example-widget__close-button

.example-widget--is-somestate
  // Module-specific state rules
```

I'm undecided on the wisdom of `@extend`ing the root module instead of requiring both classes in the HTML as Snook recommends in SMACSS, eg `<a class="example-widget example-widget--modifier">`.

It seems so much neater this way, but if you can see it biting me in the ass then let me know.

## Further reading

Ideas borrowed from many places, including:
- [Clean out your Sass junk drawer](http://gist.io/4436524) by Dale Sand
- [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) by Nicolas Gallagher
- [MindBEMding - getting your head 'round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) by Harry Roberts
- [IE-friendly mobile-first CSS with Sass 3.2](http://jakearchibald.github.com/sass-ie/) by Jake Archibald
- [Organising SASS Assets in Rails](https://coderwall.com/p/bqxhxg) by Ben Taylor

## License
Style is released under the [MIT License](http://ben.mit-license.org/)
