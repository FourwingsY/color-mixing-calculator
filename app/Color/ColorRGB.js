import Color from "./Color"

class ColorRGB extends Color {
  constructor(r = 255, g = 255, b = 255, a = 1) {
    super(r, g, b, a, "rgb")
  }

  setRGBA(r, g, b, a) {
    if (this.r == r && this.g == g && this.b == b && this.a == a) {
      return this
    }
    return new ColorRGB(r, g, b, a)
  }

  red(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 255) {
        return this.setRGBA(value, this.g, this.b, this.a)
      }
      return this
    }
    return this.r
  }

  green(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 255) {
        return this.setRGBA(this.r, value, this.b, this.a)
      }
      return this
    }
    return this.g
  }

  blue(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 255) {
        return this.setRGBA(this.r, this.g, value, this.a)
      }
      return this
    }
    return this.b
  }

  alpha(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 1) {
        return this.setRGBA(this.r, this.g, this.b, value)
      }
      return this
    }
    return this.a
  }

  toCSSString() {
    return `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.a.toFixed(2)})`
  }
}

export default ColorRGB