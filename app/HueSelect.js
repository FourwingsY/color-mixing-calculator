import React from 'react'

import Draggable from './Draggable'
import Color from "./Color"

function d2r(degrees) {
  return degrees * Math.PI / 180
}
function r2d(radians) {
  return radians / Math.PI * 180
}

class HueSelect extends Draggable {

  static propTypes = {
    color: React.PropTypes.object,
    onSelect: React.PropTypes.func
  }

  static defaultProps = {
    onSelect: (hue) => {}
  }

  state = {
    isDragging: false
  }

  size = [340, 340]
  padding = 10
  center = [160, 160]
  radius = 150
  thick = 20

  setPosition = (e) => {
    let selectorNode = this.draggingNode
    let selectorRect = selectorNode.getBoundingClientRect()

    let x = e.clientX - selectorRect.left - 20 - this.center[0]
    let y = e.clientY - selectorRect.top - 20 - this.center[1]
    let hue = mod(r2d(Math.atan2(y, x)) + 360, 360)
    this.setState({hue})
    this.props.onSelect(hue)
  }

  renderTick(hue) {
    let [cx, cy] = this.center
    let innerRadius = this.radius - this.thick / 2
    let outerRadius = this.radius + this.thick / 2
    let points = [
      [cx + innerRadius * Math.cos(d2r(hue)), cy + innerRadius * Math.sin(d2r(hue))],
      [cx + innerRadius * Math.cos(d2r(hue+1)), cy + innerRadius * Math.sin(d2r(hue+1))],
      [cx + outerRadius * Math.cos(d2r(hue+1)), cy + outerRadius * Math.sin(d2r(hue+1))],
      [cx + outerRadius * Math.cos(d2r(hue)), cy + outerRadius * Math.sin(d2r(hue))],
    ]
    let color = new Color(hue, 1, 0.5, 1, "hsl")

    return (
      <path
        key={hue} data-hue={hue}
        fill={color.toCSSString()}
        stroke={color.toCSSString()}
        d={`M ${points[0]} L ${points[1]} L ${points[2]} L ${points[3]} Z`}
      />
    )
  }

  renderTicks() {
    return Array.apply(0, Array(360)).map((_, n) => this.renderTick(n))
  }

  renderHandle() {
    let hue = this.props.color.toHSL().hue()
    console.log(this.props.color.toHSL())
    let cx = this.center[0] + this.radius * Math.cos(d2r(hue))
    let cy = this.center[1] + this.radius * Math.sin(d2r(hue))
    console.log(cx, cy)

    return <circle cx={cx} cy={cy} r="5" fill="none" stroke="black" />
  }

  render() {
    return (
      <svg className="hue-select" width={this.size[0]} height={this.size[1]}>
        <g transform={`translate(${this.padding}, ${this.padding})`} onMouseDown={this.onMouseDown}>
          {this.renderTicks()}
          {this.renderHandle()}
        </g>
      </svg>
    )
  }
}

export default HueSelect

function mod(n, m) {
  return n - m * Math.floor(n / m)
}