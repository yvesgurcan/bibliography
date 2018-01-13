import React, { Component } from "react"

export class Link extends Component {

  state = {
    normalStyle: {
      color: "darkseagreen"
    },
    hoverStyle: {
      color: "darkgreen"
    },
    clickedStyle: {
      color: "lightgreen"
    }
  }
  
  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  onHover = () => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }

  onClick = (event) => {
    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    if (this.props.onClick) {
      this.props.onClick(event.target)
      event.stopPropagation()
    }
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render = () => (
    <a onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} href={this.props.href} target={this.props.target} style={{textDecoration: "none", ...this.state.dynamicStyle}}>{this.props.children}</a>
  )
}

export default Link