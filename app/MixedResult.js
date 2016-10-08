import React from "react"

class MixedResult extends React.Component {
  render() {
    return (
      <div className="mixed-result">
        <div className="background" style={{background: this.props.backgroundColor.toCSSString()}} />
        <div className="foreground" style={{background: this.props.foregroundColor.toCSSString()}} />
      </div>
    )
  }
}

export default MixedResult