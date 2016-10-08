import Color from "./Color"
import ColorConverter from "./ColorConverter"

// extend Color
Color.prototype = Object.assign(Color.prototype, ColorConverter)

export default Color