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

export {RGB2HSL, HSL2RGB}