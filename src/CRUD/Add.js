import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Text from "./../Boilerplate/Text"

export class AddContainer extends Component {

  state = {
    normalStyle: {
      color: "steelblue"
    },
    hoverStyle: {
      color: "navy"
    },
    clickedStyle: {
      color: "lightskyblue"
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
    this.handleAdd()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  handleAdd = () => {
    if (this.props.addMode) {
      this.props.dispatch({type: "ADD_MODE_OFF"})
    }
    else {
      if (!this.props.allowEdit) {
        // TODO prompt for username and password
      }
      else {
        this.props.dispatch({type: "ADD_MODE_ON"})
      }
    }
  }

  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{fontSize: "80%", fontWeight: "bold", textDecoration: "underline", cursor: "pointer", userSelect: "none", margin: 8, marginRight: 5, ...this.state.dynamicStyle}}>
      <Text>{this.props.addMode ? "Cancel" : "Add"}</Text>
    </Text>
  )
}
export const Add = connect(mapStateToProps)(AddContainer)

export default Add