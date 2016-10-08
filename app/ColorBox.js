import React from 'react'

import ColorPicker from "./ColorPicker"

class ColorBox extends React.Component {
  static propTypes = {
    color: React.PropTypes.object,
    onChange: React.PropTypes.func,
    fixedOpacity: React.PropTypes.bool
  }
  state = {
    openColorPicker: false
  }

  toggleColorPicker = () => {
    this.setState({openColorPicker: !this.state.openColorPicker})
  }

  render() {
    return (
      <div className="color-box">
        <div className="color-preview" style={{background: this.props.color.toCSSString()}}>
          {this.props.onChange ? <button onClick={this.toggleColorPicker} /> : null}
        </div>
        {this.state.openColorPicker
          ? <ColorPicker color={this.props.color} onChange={this.props.onChange} fixedOpacity={this.props.fixedOpacity} />
          : null
        }
      </div>
    )
  }
}

export default ColorBox