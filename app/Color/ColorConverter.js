import ColorRGB from "./ColorRGB"
import ColorHSL from "./ColorHSL"
import {RGB2HSL, HSL2RGB} from "./colorUtils"

let ColorConverter = {
  asSubType() {
    switch(this.type) {
      case "rgb":
        return this.toRGB()
      case "hsl":
        return this.toHSL()
    }
  },

  toRGB() {
    if (this.type == "rgb") {
      if (this instanceof ColorRGB) {
        return this
      }
      return new ColorRGB(this.r, this.g, this.b, this.a)
    }
    if (this.type == "hsl") {
      let rgb = HSL2RGB(this.h, this.s, this.l)
      return new ColorRGB(rgb.r, rgb.g, rgb.b, this.a)
    }
  },

  toHSL() {
    if (this.type == "hsl") {
      if (this instanceof ColorHSL) {
        return this
      }
      return new ColorHSL(this.h, this.s, this.l, this.a)
    }
    if (this.type == "rgb") {
      let hsl = RGB2HSL(this.r, this.g, this.b)
      return new ColorHSL(hsl.h, hsl.s, hsl.l, this.a)
    }
  }
}

export default ColorConverter