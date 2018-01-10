import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {InputText} from "./../Boilerplate/Input"
import View from "./../Boilerplate/Text"

class NameContainer extends Component {
  render = () => (
    <h2 style={{margin: 0, marginRight: 5, display: "inline-block"}}>{this.props.children}</h2>
  )
}
export const Name = connect(mapStateToProps)(NameContainer)

export default Name