import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Minus from "./../Boilerplate/Minus"
import Plus from "./../Boilerplate/Plus"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

class TagsContainer extends Component {

  addTag = () => {
    this.props.dispatch({type: "ADD_TAG", url: this.props.reference.url})
  }

  removeTag = () => {
    this.props.dispatch({type: "REMOVE_TAG", url: this.props.reference.url})
  }

  render() {
    if (!this.props.children && !this.props.editMode) return null
    let reference = this.props.reference
    return (
      <View style={{marginTop: 8}}>
        {this.props.editMode ? <Label>Tags:</Label> : null}
        {this.props.editMode ? <Text style={{display: "inline-block", marginBottom: 2, marginRight: 5}}><Plus onClick={this.addTag}/> <Minus hidden={!reference.tags || reference.tags.length === 0} reference={reference} onClick={this.removeTag}/></Text> : null}
        {this.props.width < 790 ? <View/> : null}
        {this.props.children && this.props.children.map((tag, index) => (<Text key={index}><Tag editMode={this.props.editMode} reference={reference} index={index}>{tag}</Tag>{this.props.children.length-1 === index || this.props.editMode ? " " : ", "}</Text>))}
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
  
  saveChange = (input) => {
    let reference = this.props.reference
    let newTags = [...reference.tags]
    newTags[this.props.index] = input.value
    this.props.dispatch({type: "SAVE_CHANGES", url: this.props.reference.url, name: input.name, value: newTags})
  }

  render = () => {
    if (this.props.editMode) {
      return (
        <Text>
          <TextInput name="tags" value={this.props.children} onChange={this.saveChange} style={{width: this.props.width < 580 ? "100%" : this.props.width < 790 ? "30%" : "190px"}}/>
        </Text>
      )
    }
    return (
      <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{cursor: "pointer", userSelect: "none", ...this.state.dynamicStyle}}>{this.props.children}</Text>      
    )
  }
}
export const Tag = connect(mapStateToProps)(TagContainer)

export default Tags