import React from 'react'

import Color from './Color'
import ColorBox from "./ColorBox"
import Slider from "./Slider"
import MixedResult from "./MixedResult"

class ColorMixingCalculatorB extends React.Component {

  state = {
    backgroundColor: new Color().random(),
    foregroundColor: new Color(),
    mixedColor: new Color().random(),
    foregroundOpacity: 0.5,

    minForeColor: new Color(),
    minForeOpacity: 0.5
  }

  componentDidMount() {
    this.onChangeColor("foregroundColor")(this.state.foregroundColor)
  }

  getMinimumOpacity = (backgroundColor, mixedColor) => {
    let iteration = 1
    while (iteration <= 100) {
      let opacity = 0.01 * iteration
      let mixed_a = 1 / opacity
      let background_a = 1 - mixed_a

      let r = mixedColor.red() * mixed_a + backgroundColor.red() * background_a
      let g = mixedColor.green() * mixed_a + backgroundColor.green() * background_a
      let b = mixedColor.blue() * mixed_a + backgroundColor.blue() * background_a

      if (r < 0 || 255 < r || g < 0 || 255 < g || b < 0 || 255 < b) {
        iteration += 1
        continue
      }
      break
    }
    return 0.01 * iteration
  }

  onChangeColor = (key) => (color) => {
    // 1. calculate color
    let state = Object.assign({}, this.state)
    state[key] = color

    let backgroundColor = state.backgroundColor.toRGB()
    let mixedColor = state.mixedColor.toRGB()

    let opacity = this.getMinimumOpacity(backgroundColor, mixedColor)
    let mixed_a = 1 / opacity
    let background_a = 1 - mixed_a

    let r = mixedColor.red() * mixed_a + backgroundColor.red() * background_a
    let g = mixedColor.green() * mixed_a + backgroundColor.green() * background_a
    let b = mixedColor.blue() * mixed_a + backgroundColor.blue() * background_a

    if (r < 0 || 255 < r || g < 0 || 255 < g || b < 0 || 255 < b) {
      console.warn("color out of range")
    }

    let foregroundColor = new Color(r, g, b, opacity)

    // 2. set state
    this.setState({
      [key]: color,
      foregroundColor: foregroundColor,
      foregroundOpacity: opacity,
      minForeColor: foregroundColor,
      minForeOpacity: opacity
    })
  }

  onChangeOpacity = (opacity) => {
    // 1. calculate color
    let backgroundColor = this.state.backgroundColor.toRGB()
    let mixedColor = this.state.mixedColor.toRGB()

    let mixed_a = 1 / opacity
    let background_a = 1 - mixed_a

    let r = mixedColor.red() * mixed_a + backgroundColor.red() * background_a
    let g = mixedColor.green() * mixed_a + backgroundColor.green() * background_a
    let b = mixedColor.blue() * mixed_a + backgroundColor.blue() * background_a

    if (r < 0 || 255 < r || g < 0 || 255 < g || b < 0 || 255 < b) {
      console.warn("color out of range")
    }

    let foregroundColor = new Color(r, g, b, opacity)

    // 2. set state
    this.setState({foregroundColor, foregroundOpacity: opacity})
  }

  render() {
    let gradient = [
      {color: new Color(255, 255, 255, 1, "rgb"), key: 0},
      {color: new Color(255, 255, 255, 1, "rgb"), key: Math.floor(this.state.minForeOpacity * 100)},
      {color: this.state.minForeColor, key: Math.floor(this.state.minForeOpacity * 100)},
      {color: this.state.mixedColor, key: 100}
    ]

    return (
      <table className="color-mixing-calculator axc">
        <thead>
        <tr>
          <th>Background Color</th>
          <th />
          <th>?</th>
          <th />
          <th>Mixed Color</th>
          <th />
          <th>Mixing</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><ColorBox color={this.state.backgroundColor} onChange={this.onChangeColor("backgroundColor")} fixedOpacity /></td>
          <td><div className="math-symbol">+</div></td>
          <td>
            <ColorBox color={this.state.foregroundColor}/>
            <Slider
              minValue={this.state.minForeOpacity}
              value={this.state.foregroundOpacity} onChange={this.onChangeOpacity}
              gradient={gradient} style={{position: "absolute", marginTop: -30}}
            />
          </td>
          <td><div className="math-symbol">=</div></td>
          <td><ColorBox color={this.state.mixedColor} onChange={this.onChangeColor("mixedColor")} fixedOpacity /></td>
          <td><div className="math-symbol">=</div></td>
          <td><MixedResult foregroundColor={this.state.foregroundColor} backgroundColor={this.state.backgroundColor} /></td>
        </tr>
        <tr>
          <td>{this.state.backgroundColor.toRGB().toCSSString()}</td>
          <td />
          <td>{this.state.foregroundColor.toRGB().toCSSString()}</td>
          <td />
          <td>{this.state.mixedColor.toRGB().toCSSString()}</td>
          <td />
          <td />
        </tr>
        </tbody>
      </table>
    )
  }
}

export default ColorMixingCalculatorB