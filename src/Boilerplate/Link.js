import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

export class LinkContainer extends Component {

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
    if (!this.props.isOnline) {
      this.props.dispatch({type: "DO_NOT_FOLLOW_LINK_MESSAGE"})
      return null
    }
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
const Link = connect(mapStateToProps)(LinkContainer)

export default Link