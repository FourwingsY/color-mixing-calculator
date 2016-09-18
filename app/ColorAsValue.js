import React from 'react'

class ColorAsValue extends React.Component {

  static propTypes = {
    color: React.PropTypes.object,
    onChange: React.PropTypes.func
  }

  onChange = (key) => (e) => {
    let value = e.target.value

    let rgbKeys = ["red", "green", "blue"]
    if (rgbKeys.includes(key)) {
      value = Number(value)
      if (isNaN(value)) {
        return
      }
      if (value < 0 || 255 < value) {
        return
      }
      let newColor = this.props.color.toRGB()[key](value)
      this.props.onChange(newColor)
      return
    }

    if (key == "hue") {
      value = Number(value)
      if (isNaN(value)) {
        return
      }
      if (value < 0 || 360 < value) {
        return
      }
      let newColor = this.props.color.toHSL().hue(value)
      this.props.onChange(newColor)
    }

    let hslKeys = ["saturation", "lightness"]
    if (hslKeys.includes(key)) {
      value = Number(value)
      if (isNaN(value)) {
        return
      }
      if (value < 0 || 100 < value) {
        return
      }
      let newColor = this.props.color.toHSL()[key](value / 100)
      this.props.onChange(newColor)
    }
  }

  render() {
    let colorRGB = this.props.color.toRGB()
    let colorHSL = this.props.color.toHSL()

    let percentize = (number) => {
      return Number(number*100).toFixed(1)
    }

    return (
      <table>
        <colgroup>
          {/* RGB */}
          <col width={34} />
          <col width={45} />
          <col width={34} />
          <col width={45} />
          <col width={34} />
          <col width={45} />

          {/* Hex */}
          <col width={45} />
          <col width={72} />

          {/* Opacity */}
          <col width={64} />
          <col width={45} />
        </colgroup>
        <tbody>
          <tr>
            <th>R</th>
            <td><input type="text" value={colorRGB.red()} onChange={this.onChange("red")} /></td>
            <th>G</th>
            <td><input type="text" value={colorRGB.green()} onChange={this.onChange("green")} /></td>
            <th>B</th>
            <td><input type="text" value={colorRGB.blue()} onChange={this.onChange("blue")} /></td>
            <th>Hex</th>
            <td><input type="text" value={colorRGB.toHex()} onChange={this.onChange("hex")} /></td>
            <th>Opacity</th>
            <td><input type="text" value={colorRGB.alpha()} onChange={this.onChange("alpha")} /></td>
          </tr>
          <tr>
            <th>H</th>
            <td><input type="text" value={colorHSL.hue().toFixed(0)} onChange={this.onChange("hue")} /></td>
            <th>S</th>
            <td><input type="text" value={percentize(colorHSL.saturation())} onChange={this.onChange("saturation")} /></td>
            <th>L</th>
            <td><input type="text" value={percentize(colorHSL.lightness())} onChange={this.onChange("lightness")} /></td>
            <th>hsla</th>
            <td colSpan="3"><input type="text" value={colorHSL.toCSSString()} onChange={this.onChange("hsla")} /></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ColorAsValue