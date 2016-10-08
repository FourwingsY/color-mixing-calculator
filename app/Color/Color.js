class Color {

  // This is, actually, Factory Method
  constructor(v1 = 0, v2 = 0, v3 = 0, a = 1, type = "rgb") {
    if (type == "rgb") {
      this.r = v1
      this.g = v2
      this.b = v3
    }
    if (type == "hsl") {
      this.h = v1
      this.s = v2
      this.l = v3
    }

    this.a = a
    this.type = type

    return this.asSubType()
  }

  // will be overwritten by ColorConverter
  asSubType() {
    throw Error("do not use this class directly")
  }

  random(randomAlpha) {
    let random255 = () => Math.floor(Math.random() * 256)
    let alpha = randomAlpha ? Math.random() : 1
    return new Color().toRGB().setRGBA(random255(), random255(), random255(), alpha)
  }

  toHex() {
    // toRGB method will be injected after the class exported
    let rgb = this.toRGB()
    let hexize = (v) => Number(v).toString(16).padStart(2, 0)
    return `#${hexize(rgb.red())}${hexize(rgb.green())}${hexize(rgb.blue())}`
  }

  // default method is toHex
  toCSSString() {
    return this.toHex()
  }
}

export default Color