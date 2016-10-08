import React from 'react'
import Draggable from '../Draggable'

import cx from 'classnames'

class ColorSlider extends Draggable {
  static propTypes = {
    color: React.PropTypes.object,
    valueOf: React.PropTypes.string, // hue or lightness
    onChange: React.PropTypes.func.isRequired,
    vertical: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  }

  setPosition(e) {
    let sliderNode = this.draggingNode // from Draggable
    let sliderRect = sliderNode.getBoundingClientRect()
    let handlePosition = e.clientX - sliderRect.left
    let percentage = handlePosition / sliderRect.width
    if (this.props.vertical) {
      handlePosition = e.clientY - sliderRect.top
      percentage = handlePosition / sliderRect.height
    }
    percentage = Math.max(0, Math.min(percentage, 1))
    this.props.onChange(percentage)
  }

  render() {
    let color = this.props.color.toHSL()
    let value = color[this.props.valueOf]()
    let positionCSS = this.props.vertical
      ? {top: value * 100 + "%"}
      : {left: value * 100 + "%"}

    let direction = this.props.vertical ? "bottom" : "right"
    let backgroundCSS = {
      background: `linear-gradient(to ${direction}, 
        ${color[this.props.valueOf](0).toCSSString()} 0%,
        ${color[this.props.valueOf](0.5).toCSSString()} 50%,
        ${color[this.props.valueOf](1).toCSSString()} 100%
      )`
    }

    let onMouseDown = this.props.disabled ? () => {} : this.onMouseDown
    return (
      <div
        className={cx("slider", {vertical: this.props.vertical, disabled: this.props.disabled}, this.props.valueOf)}
        onMouseDown={onMouseDown}
      >
        <div className="range" style={backgroundCSS} />
        <span className="handle" style={positionCSS} />
      </div>
    )
  }
}

export default ColorSlider