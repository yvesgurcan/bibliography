import React, { Component } from "react"

export class Text extends Component {
  render = () => (
    <span {...this.props}>{this.props.children}</span>
  )
}

export default Text