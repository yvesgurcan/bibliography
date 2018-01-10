import React, { Component } from "react"

export class OrderedList extends Component {
  render = () => (
    <ol>{this.props.children}</ol>
  )
}

export class ListItem extends Component {
  render = () => (
    <li style={{margin: 0}}>{this.props.children}</li>
  )
}