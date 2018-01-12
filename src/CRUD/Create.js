import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Text from "./../Boilerplate/Text"

export class CreateContainer extends Component {

  state = {
    normalStyle: {
      background: "steelblue"
    },
    hoverStyle: {
      background: "cornflowerblue"
    },
    clickedStyle: {
      background: "lightskyblue"
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
    this.timeout = null
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  onHover = () => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {
    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    this.props.dispatch({type: "CREATE_REFERENCE"})
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{display: "inline-block", cursor: "pointer", userSelect: "none", padding: 9, marginTop: 5, borderRadius: 5, color: "white", ...this.state.dynamicStyle}}>
      Create
    </Text>
  )
}
export const Create = connect(mapStateToProps)(CreateContainer)

export default Create