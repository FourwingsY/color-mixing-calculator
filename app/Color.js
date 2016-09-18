class Color {
  constructor(v1 = 0, v2 = 0, v3 = 0, a = 1, type = "rgb") {
    if (type == "rgb") {
      this.r = v1
      this.g = v2
      this.b = v3
      this.a = a
      this.type = type
      return this.toRGB()
    }
    if (type == "hsl") {
      this.h = v1
      this.s = v2
      this.l = v3
      this.a = a
      this.type = type
      return this.toHSL()
    }
  }

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
  }

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

  toHex() {
    let rgb = this.toRGB()
    let convert = (v) => Number(v).toString(16).padStart(2, 0)
    return `#${convert(rgb.red())}${convert(rgb.green())}${convert(rgb.blue())}`
  }

  toCSSString() {
    if (this.type == "rgb") {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
    if (this.type == "hsl") {
      return `hsla(${this.h.toFixed(0)}, ${Number(this.s*100).toFixed(1)}%, ${Number(this.l*100).toFixed(1)}%, ${this.a})`
    }
  }

  alpha(value) {
    if (value == undefined) {
      return this.a
    }
    return this.setAlpha(value)
  }
}

class ColorRGB extends Color {
  constructor(r = 255, g = 255, b = 255, a = 1) {
    super(r, g, b, a, "rgb")
  }

  setRGB(r, g, b) {
    return new ColorRGB(r, g, b)
  }

  setRGBA(r, g, b, a) {
    return new ColorRGB(r, g, b, a)
  }

  setAlpha(a) {
    return new ColorRGB(this.r, this.g, this.b, a)
  }

  red(value) {
    if (value !== undefined) {
      return this.setRGBA(value, this.g, this.b, this.a)
    }
    return this.r
  }

  green(value) {
    if (value !== undefined) {
      return this.setRGBA(this.r, value, this.b, this.a)
    }
    return this.g
  }

  blue(value) {
    if (value !== undefined) {
      return this.setRGBA(this.r, this.g, value, this.a)
    }
    return this.b
  }

  get rgba() {
    if (this.type == "rgb") {
      return {
        r: this.r,
        g: this.g,
        b: this.b,
        a: this.a
      }
    }
  }
}

class ColorHSL extends Color {
  constructor(h = 0, s = 1, l = 0.5, a = 1) {
    super(h, s, l, a, "hsl")
  }

  setHSL(h, s, l) {
    return new ColorHSL(h, s, l)
  }

  setHSLA(h, s, l, a) {
    return new ColorHSL(h, s, l, a)
  }

  setAlpha(a) {
    return new ColorHSL(this.h, this.s, this.l, a)
  }

  hue(value) {
    if (value !== undefined) {
      return this.setHSLA(value, this.s, this.l, this.a)
    }
    return this.h
  }

  saturation(value) {
    if (value !== undefined) {
      return this.setHSLA(this.h, value, this.l, this.a)
    }
    return this.s
  }

  lightness(value) {
    if (value !== undefined) {
      return this.setHSLA(this.h, this.s, value, this.a)
    }
    return this.l
  }

  get hsla() {
    return {
      h: this.h,
      s: this.s,
      l: this.l,
      a: this.a
    }
  }
}

export default Color

function RGB2HSL(r, g, b, defaultHue = 0) {
  let hue, saturation, lightness
  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let chroma = max - min

  if (chroma == 0) {
    hue = defaultHue
  } else {
    switch (max) {
      case r:
        hue = ((g - b) / chroma) * 60
        hue = mod(hue, 360)
        break
      case g:
        hue = ((b - r) / chroma) * 60 + 120
        break
      case b:
        hue = ((r - g) / chroma) * 60 + 240
    }
  }

  lightness = (max + min) / 255 / 2

  if (chroma == 0) {
    saturation = 0
  } else {
    saturation = chroma / 255 / (1 - Math.abs(2 * lightness - 1))
  }

  return {
    h: hue,
    s: saturation,
    l: lightness
  }
}

function HSL2RGB(h, s, l) {
  let c = s * (1 - Math.abs(2*l - 1))
  let x = c * (1 - Math.abs(mod(h / 60, 2) - 1))
  let m = l - c / 2

  let rgb
  switch (Math.floor(h / 60)) {
    case 0:
      rgb = {r: c, g: x, b: 0}
      break
    case 1:
      rgb = {r: x, g: c, b: 0}
      break
    case 2:
      rgb = {r: 0, g: c, b: x}
      break
    case 3:
      rgb = {r: 0, g: x, b: c}
      break
    case 4:
      rgb = {r: x, g: 0, b: c}
      break
    case 5:
      rgb = {r: c, g: 0, b: x}
  }
  return {
    r: Math.round((rgb.r + m) * 255),
    g: Math.round((rgb.g + m) * 255),
    b: Math.round((rgb.b + m) * 255)
  }
}

function mod(n, m) {
  return n - m * Math.floor(n / m)
}