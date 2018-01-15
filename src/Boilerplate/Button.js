import React, { Component } from "react"

import Text from "./../Boilerplate/Text"

export class Button extends Component {

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
    if (this.props.onHover) {
      this.props.onHover()        
  }
  }
    
  onClick = (event) => {
    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    if (this.props.onClick) {
        this.props.onClick()        
    }
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render = () => (
    <Text {...this.props} onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{display: "inline-block", cursor: "pointer", userSelect: "none", padding: 9, marginTop: 5, marginRight: 5, borderRadius: 5, color: "white", ...this.state.dynamicStyle}}/>
  )
}

export default Button