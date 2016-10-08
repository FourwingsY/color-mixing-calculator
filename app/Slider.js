import React from 'react'
import Draggable from './Draggable'

import cx from 'classnames'

class Slider extends Draggable {
  static propTypes = {
    value: React.PropTypes.number,
    minValue: React.PropTypes.number,
    maxValue: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    gradient: React.PropTypes.array
  }

  static defaultProps = {
    minValue: 0,
    maxValue: 1
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
    percentage = Math.max(this.props.minValue, Math.min(percentage, this.props.maxValue))
    this.props.onChange(percentage)
  }

  getGradient() {
    let gradientKeyframes = this.props.gradient.map(gradient => (
      `${gradient.color.toCSSString()} ${gradient.key}%`
    ))
    let direction = this.props.vertical ? "bottom" : "right"

    return {
      background: `linear-gradient(to ${direction}, ${gradientKeyframes})`
    }
  }
  render() {
    let positionCSS = this.props.vertical
      ? {top: this.props.value * 100 + "%"}
      : {left: this.props.value * 100 + "%"}

    let gradientStyle = this.getGradient()

    return (
      <div
        className={cx("slider", {vertical: this.props.vertical}, this.props.className)}
        onMouseDown={this.onMouseDown}
        style={this.props.style}
      >
        <div className="range" style={gradientStyle} />
        <span
          className="handle"
          style={positionCSS}
        />
      </div>
    )
  }
}

export default Slider