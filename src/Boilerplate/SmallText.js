import React, { Component } from "react"

export class SmallText extends Component {
  render = () => (
    <small>{this.props.children}</small>
  )
}

export default SmallText