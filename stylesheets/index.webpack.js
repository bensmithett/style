// In a typical webpack project, you wouldn't have a
// big manifest file like this. Instead, you'd require
// a particular stylesheet from inside the component/view
// file that needs it, allowing Webpack to build the final
// CSS output based on the dependencies you actually use.

// For more info read:
// http://bensmithett.com/smarter-css-builds-with-webpack/

require('sanitize.css/dist/sanitize.css')

require('base/font_faces')
require('base/animations/flash')
require('base/reset')

require('type/type_heading')
require('type/type_link')
require('type/type_list')
require('type/type_paragraph')

require('components/grid')
require('components/layout_box')

require('utilities/u_hidden')
require('utilities/u_truncate')
