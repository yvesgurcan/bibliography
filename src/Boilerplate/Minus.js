import React, { Component } from "react"

import View from "./View"

export class Minus extends Component {
  render = () => {
    if (this.props.hidden) return null
    return (
      <View onClick={this.props.onClick} style={{display: "inline-block", border: "2px solid black", borderRadius: "50%", height: 20, width: 20, userSelect: "none", cursor: "pointer", background: "black", color: "white"}}>
        <View style={{width: "100%", height: "100%", margin: "auto", textAlign: "center"}}>
          –
        </View>
      </View>
    )
  }
}

export default Minus