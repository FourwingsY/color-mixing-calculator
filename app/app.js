import React from 'react'

import Color from './Color'
import ColorPreview from './ColorPreview'
import ColorPicker from "./ColorPicker"

class App extends React.Component {

  state = {
    color: new Color().toHSL(),
    openColorPicker: false
  }

  toggleColorPicker = () => {
    this.setState({openColorPicker: !this.state.openColorPicker})
  }

  onChange = (color) => {
    this.setState({color: color})
  }

  render() {
    return (
      <div>
        <ColorPreview color={this.state.color} onToggle={this.toggleColorPicker} />
        {this.state.openColorPicker
          ? <ColorPicker color={this.state.color} onChange={this.onChange} />
          : null
        }
      </div>
    )
  }
}

export default App