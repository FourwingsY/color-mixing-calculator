import React from 'react'

import Color from './Color'
import ColorBox from "./ColorBox"
import Slider from "./Slider"
import MixedResult from "./MixedResult"

class ColorMixingCalculatorC extends React.Component {

  state = {
    backgroundColor: new Color().random(),
    foregroundColor: new Color().random(true),
    mixedColor: new Color()
  }

  componentDidMount() {
    this.onChangeColor("foregroundColor")(this.state.foregroundColor)
  }

  onChangeColor = (key) => (color) => {
    // 1. calculate color
    let state = Object.assign({}, this.state)
    state[key] = color

    let backgroundColor = state.backgroundColor.toRGB()
    let foregroundColor = state.foregroundColor.toRGB()

    let opacity = foregroundColor.alpha()
    let background_a = 1 - opacity
    let foreground_a = opacity

    let r = backgroundColor.red() * background_a + foregroundColor.red() * foreground_a
    let g = backgroundColor.green() * background_a + foregroundColor.green() * foreground_a
    let b = backgroundColor.blue() * background_a + foregroundColor.blue() * foreground_a

    let mixedColor = new Color(r, g, b)

    // 2. set state
    this.setState({
      [key]: color,
      mixedColor
    })
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
          <th>Foreground Color</th>
          <th />
          <th>?</th>
          <th />
          <th>Mixing</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><ColorBox color={this.state.backgroundColor} onChange={this.onChangeColor("backgroundColor")} fixedOpacity /></td>
          <td><div className="math-symbol">+</div></td>
          <td><ColorBox color={this.state.foregroundColor} onChange={this.onChangeColor("foregroundColor")} /></td>
          <td><div className="math-symbol">=</div></td>
          <td><ColorBox color={this.state.mixedColor} /></td>
          <td><div className="math-symbol">=</div></td>
          <td><MixedResult foregroundColor={this.state.foregroundColor} backgroundColor={this.state.backgroundColor}/></td>
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

export default ColorMixingCalculatorC