import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

class TypeContainer extends Component {
  
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
    this.props.dispatch({type:"ADD_STRING_TO_SEARCH", string: this.props.children || this.props.collectionString})
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }
  
  saveChange = (input) => {
    this.props.dispatch({type: "SAVE_CHANGES", url: this.props.reference.url, name: input.name, value: input.value})
  }

  render = () => {
    if (this.props.editMode) {
      return (
        <View>
          <Label>Type:</Label>
          <TextInput name="type" value={this.props.children} onChange={this.saveChange} />
        </View>
      )
    }
    if (!this.props.children && (!this.props.isItem && !this.props.reference.collection)) return null
    if (!this.props.children && this.props.isItem) return null
    return (
      <Text style={{fontWeight: this.props.isItem ? null : "bold"}}>
        <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{userSelect: "none", ...this.state.dynamicStyle}}>{this.props.children || (!this.props.isItem && this.props.reference.collection ? this.props.collectionString : null)}{!this.props.isItem ? " " : null}</Text>
    </Text>
    )
  }
}
export const Type = connect(mapStateToProps)(TypeContainer)

export default Type