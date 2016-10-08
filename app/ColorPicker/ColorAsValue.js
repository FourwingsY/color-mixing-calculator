import React from 'react'

class ColorAsValue extends React.Component {

  static propTypes = {
    color: React.PropTypes.object,
    onChange: React.PropTypes.func
  }

  state = {
    red: this.props.color.toRGB().red(),
    green: this.props.color.toRGB().green(),
    blue: this.props.color.toRGB().blue(),
    alpha: this.props.color.alpha(),
    hue: this.props.color.toHSL().hue().toFixed(0),
    saturation: this.props.color.toHSL().saturation().toFixed(3),
    lightness: this.props.color.toHSL().lightness().toFixed(3),
    editing: ""
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      let newState = {
        red: nextProps.color.toRGB().red(),
        green: nextProps.color.toRGB().green(),
        blue: nextProps.color.toRGB().blue(),
        alpha: nextProps.color.alpha(),
        hue: nextProps.color.toHSL().hue().toFixed(0),
        saturation: nextProps.color.toHSL().saturation().toFixed(3),
        lightness: nextProps.color.toHSL().lightness().toFixed(3)
      }

      // 현재 수정중인 인풋 창은 계속 컨트롤할 수 있어야 한다.
      delete newState[this.state.editing]

      this.setState(newState)
    }
  }

  onChangeValue = (key) => (e) => {
    let value = e.target.value

    // sync change editing input's key, without render
    this.state.editing = key
    // async change input value
    this.setState({[key]: value})

    // send event, but may filtered by color value range validation
    let newColor = this.props.color
    if (["red", "green", "blue"].includes(key)) {
      newColor = newColor.toRGB()
    }
    if (["hue", "saturation", "lightness"].includes(key)) {
      newColor = newColor.toHSL()
    }
    this.props.onChange(newColor[key](Number(value)))
  }

  onChangeExpression = (exp) => (e) => {
    // check validation for expression
    // and apply to color
  }

  render() {
    let colorRGB = this.props.color.toRGB()
    let colorHSL = this.props.color.toHSL()

    return (
      <table className="color-as-value">
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
            <td><input type="text" value={this.state.red} onChange={this.onChangeValue("red")} /></td>
            <th>G</th>
            <td><input type="text" value={this.state.green} onChange={this.onChangeValue("green")} /></td>
            <th>B</th>
            <td><input type="text" value={this.state.blue} onChange={this.onChangeValue("blue")} /></td>
            <th>Hex</th>
            <td><input type="text" value={colorRGB.toHex()} onChange={this.onChangeExpression("hex")} /></td>
            <th>Opacity</th>
            <td><input type="text" value={this.state.alpha} onChange={this.onChangeValue("alpha")} /></td>
          </tr>
          <tr>
            <th>H</th>
            <td><input type="text" value={this.state.hue} onChange={this.onChangeValue("hue")} /></td>
            <th>S</th>
            <td><input type="text" value={this.state.saturation} onChange={this.onChangeValue("saturation")} /></td>
            <th>L</th>
            <td><input type="text" value={this.state.lightness} onChange={this.onChangeValue("lightness")} /></td>
            <th>hsla</th>
            <td colSpan="3"><input type="text" value={colorHSL.toCSSString()} onChange={this.onChangeExpression("hsla")} /></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ColorAsValue