import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../Store/mapStateToProps"

import Text from "./../Boilerplate/Text"

export class RefreshContainer extends Component {

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
    if (this.props.noSignIn) {
      this.props.dispatch({type: "SHOW_MODAL", id: "confirmRefresh"})
      return null
    }
    this.props.dispatch({type: "GET_REFERENCES_REMOTELY"})
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{fontSize: "80%", fontWeight: "bold", textDecoration: "underline", cursor: "pointer", userSelect: "none", margin: 8, marginRight: 5, ...this.state.dynamicStyle}}>
      <Text>Refresh</Text>
    </Text>
  )
}
export const Refresh = connect(mapStateToProps)(RefreshContainer)

export default Refresh