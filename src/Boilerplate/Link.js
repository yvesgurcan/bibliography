import React, { Component } from "react"

export class Link extends Component {
  render = () => (
    <a href={this.props.href} target={this.props.target} style={{textDecoration: "none", color: "forestgreen"}}>{this.props.children}</a>
  )
}

export default Link