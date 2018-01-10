import React, { Component } from "react"

export class Label extends Component {
  render = () => (
    <label {...this.props} style={{marginRight: 5, ...this.props.style}}>{this.props.children}</label>
  )
}

export default Label