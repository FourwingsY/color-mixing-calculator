import React from 'react'

import HueSelect from "./HueSelect"
import SLSelect from "./SLSelect"
import ColorSlider from "./ColorSlider"
import ColorAsValue from "./ColorAsValue"

class ColorPicker extends React.Component {

  static propTypes = {
    color: React.PropTypes.object,
    onChange: React.PropTypes.func,
    fixedOpacity: React.PropTypes.bool
  }

  setColor = (color) => {
    this.props.onChange(color)
  }

  setHue = (hue) => {
    let newColor = this.props.color.toHSL().hue(hue)
    this.props.onChange(newColor)
  }

  setSL = (sat, light) => {
    let newColor = this.props.color.toHSL()
      .saturation(sat)
      .lightness(light)
    this.props.onChange(newColor)
  }

  setAlpha = (alpha) => {
    let newColor = this.props.color.alpha(alpha)
    this.props.onChange(newColor)
  }

  setSaturation = (saturation) => {
    let newColor = this.props.color.toHSL().saturation(saturation)
    this.props.onChange(newColor)
  }

  setLightness = (lightness) => {
    let newColor = this.props.color.toHSL().lightness(lightness)
    this.props.onChange(newColor)
  }

  render() {
    return (
      <div className="color-picker">
        <ColorSlider color={this.props.color} valueOf="saturation" onChange={this.setSaturation} vertical />
        <div className="visual-picker">
          <HueSelect color={this.props.color} onSelect={this.setHue} />
          <SLSelect color={this.props.color} onSelect={this.setSL} />
        </div>
        <ColorSlider color={this.props.color} valueOf="alpha" onChange={this.setAlpha} disabled={this.props.fixedOpacity} vertical />
        <ColorSlider color={this.props.color} valueOf="lightness" onChange={this.setLightness} />
        <ColorAsValue color={this.props.color} onChange={this.setColor} />
      </div>
    )
  }
}

export default ColorPicker
