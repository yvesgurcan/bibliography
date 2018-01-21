import React, { Component } from "react"

import View from "./../Boilerplate/View"

export class Plus extends Component {
  render = () => (
    <View onClick={this.props.onClick} style={{display: "inline-block", border: "2px solid black", borderRadius: "50%", height: 20, width: 20, userSelect: "none", cursor: "pointer", background: "black", color: "white"}}>
      <View style={{width: "100%", height: "100%", margin: "auto", textAlign: "center"}}>
        +
      </View>
    </View>
  )
}

export default Plus