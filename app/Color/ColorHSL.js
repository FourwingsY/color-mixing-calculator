import Color from "./Color"

class ColorHSL extends Color {
  constructor(h = 0, s = 1, l = 0.5, a = 1) {
    super(h, s, l, a, "hsl")
  }

  setHSLA(h, s, l, a) {
    if (this.h == h && this.s == s && this.l == l && this.a == a) {
      return this
    }
    return new ColorHSL(h, s, l, a)
  }

  hue(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 359) {
        return this.setHSLA(value, this.s, this.l, this.a)
      }
      return this
    }
    return this.h
  }

  saturation(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 1) {
        return this.setHSLA(this.h, value, this.l, this.a)
      }
      return this
    }
    return this.s
  }

  lightness(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 1) {
        return this.setHSLA(this.h, this.s, value, this.a)
      }
      return this
    }
    return this.l
  }

  alpha(value) {
    if (value !== undefined) {
      if (0 <= value && value <= 1) {
        return this.setHSLA(this.h, this.s, this.l, value)
      }
      return this
    }
    return this.a
  }

  toCSSString() {
    return `hsla(${this.h.toFixed(0)}, ${Number(this.s*100).toFixed(1)}%, ${Number(this.l*100).toFixed(1)}%, ${this.a})`
  }
}

export default ColorHSL