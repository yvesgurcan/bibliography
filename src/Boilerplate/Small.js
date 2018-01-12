import React, { Component } from "react"

import Text from "./../Boilerplate/Text"

export class Small extends Component {
  render = () => (
    <Text>{this.props.children}</Text>
  )
}

export default Text