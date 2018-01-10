import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

class TagsContainer extends Component {
  render() {
    if (!this.props.children) return null
    return (
      <View style={{marginTop: 8}}>
        {this.props.children.map((tag, index) => (<Text key={tag}><Tag>{tag}</Tag>{this.props.children.length-1 === index ? null : ", "}</Text>))}
      </View>      
    )
  }
}
export const Tags = connect(mapStateToProps)(TagsContainer)

class TagContainer extends Component {

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
    this.props.dispatch({type:"ADD_STRING_TO_SEARCH", string: this.props.children})
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }
  
  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{cursor: "pointer", userSelect: "none", ...this.state.dynamicStyle}}>{this.props.children}</Text>
  )
}
export const Tag = connect(mapStateToProps)(TagContainer)