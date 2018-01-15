import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Button from "./../Boilerplate/Button"
import Text from "./../Boilerplate/Text"

export class CreateContainer extends Component {
  onClick = () => {
    this.props.dispatch({type: "CREATE_REFERENCE"})
  }
  render = () => (
    <Button onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut}>
      Create
    </Button>
  )
}
export const Create = connect(mapStateToProps)(CreateContainer)

export default Create