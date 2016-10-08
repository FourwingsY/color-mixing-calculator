import React from 'react'
import Draggable from '../Draggable'

class SLSelect extends Draggable {
  static propTypes = {
    color: React.PropTypes.object,
    onSelect: React.PropTypes.func
  }

  setPosition(e) {
    let selectorNode = this.draggingNode // from Draggable
    let selectorRect = selectorNode.getBoundingClientRect()

    let x = (e.clientX - selectorRect.left) / selectorRect.width
    let y = (e.clientY - selectorRect.top) / selectorRect.height
    let saturation = Math.max(0, Math.min(1, y))
    let lightness = Math.max(0, Math.min(1, x))
    this.props.onSelect(saturation, lightness)
  }

  getGradients(hue) {
    return {
      background: `
        linear-gradient(to right, hsla(${hue}, 0%, 0%, 1) 0%, hsla(${hue}, 0%, 0%, 0) 50%, hsla(${hue}, 0%, 100%, 0) 50%, hsla(${hue}, 0%, 100%, 1) 100%),
        linear-gradient(to top, hsla(${hue}, 100%, 50%, 1) 0%, hsla(${hue}, 0%, 50%, 1) 100%)
        no-repeat center
      `
    }
  }

  render() {
    let color = this.props.color.toHSL()
    let hue = color.hue()
    let saturation = color.saturation()
    let lightness = color.lightness()
    return (
      <div
        className="sl-select" style={this.getGradients(hue)}
        onMouseDown={this.onMouseDown}
      >
        <span
          className="handle"
          style={{top: saturation * 100 + "%", left: lightness * 100 + "%"}}
        />
      </div>
    )
  }
}

export default SLSelect