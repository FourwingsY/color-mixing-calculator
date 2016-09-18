import React from 'react'
import Draggable from './Draggable'

import cx from 'classnames'

class Slider extends Draggable {
  static propTypes = {
    value: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  }

  setPosition = (e) => {
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
    let positionCSS = this.props.vertical
      ? {top: this.props.value * 100 + "%"}
      : {left: this.props.value * 100 + "%"}

    return (
      <div
        className={cx("slider", {vertical: this.props.vertical}, this.props.className)}
        onMouseDown={this.onMouseDown}
      >
        <div className="range" />
        <span
          className="handle"
          style={positionCSS}
        />
      </div>
    )
  }
}

export default Slider