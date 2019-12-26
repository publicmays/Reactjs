// with data-react properties to HTML elements
// so React on client won't have to render elements again

import {renderToString} from "react-dom/server"
renderToString(<App />)

// not recommended, components will rerender
import {renderToStaticMarkup} from "react-dom/server"
renderToStaticMarkup(<App />)