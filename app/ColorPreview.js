import React from 'react'

class ColorPreview extends React.Component {
  static propTypes = {
    color: React.PropTypes.object,
    onToggle: React.PropTypes.func
  }

  render() {
    let color = this.props.color
    return (
      <div className="color-preview" style={{background: color.toCSSString()}}>
        <button onClick={this.props.onToggle} />
      </div>
    )
  }
}

export default ColorPreview