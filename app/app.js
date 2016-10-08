import React from 'react'

import ColorMixingCalculatorB from "./ColorMixingCalculatorB"
import ColorMixingCalculatorC from "./ColorMixingCalculatorC"

let logo = require("./img/cmc.png")

class App extends React.Component {

  render() {
    return (
      <div id="container">
        <header><img id="logo" src={logo} alt="logo" /></header>
        <h1>Color Mixing Calculator</h1>
        <h2>A + B = ? (Color Mixing)</h2>
        <ColorMixingCalculatorC />
        <h2>A + ? = C (Color Dividing)</h2>
        <ColorMixingCalculatorB />
      </div>
    )
  }
}

export default App