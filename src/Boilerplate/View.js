import React, { Component } from "react"

export class View extends Component {
  render = () => (
    <div {...this.props}>{this.props.children}</div>
  )
}

export default View