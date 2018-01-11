import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput, Checkbox} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

class AuthorContainer extends Component {

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
    this.props.dispatch({type: "ADD_STRING_TO_SEARCH", string: this.props.children})
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }
  
  saveChange = (input) => {
    let value = input.value
    if (input.inputType === "checkbox") {
      value = input.checked
    }
    this.props.dispatch({type: "SAVE_CHANGES", url: this.props.reference.url, name: input.name, value: value})
  }

  render = () => {
    var reference = this.props.reference
    if (this.props.editMode) {
      return (
        <View>
          <Label>Author:</Label>
          <TextInput name="author" hidden={reference.variousAuthors} value={this.props.children} onChange={this.saveChange} style={{width: "100%"}} />
          <Checkbox name="variousAuthors" value={reference.variousAuthors} onChange={this.saveChange}>Various authors</Checkbox>
        </View>
      )
    }
    if (!this.props.children && !this.props.isItem && !this.props.reference.variousAuthors) return null
    if (!this.props.children && this.props.isItem) return null
    return (
      <Text style={{fontWeight: this.props.isItem ? null : "bold"}}>
      by <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{userSelect: "none", ...this.state.dynamicStyle}}>{this.props.children || (!this.props.isItem && reference.variousAuthors ? this.props.variousAuthorsString : null)}</Text>
    </Text>
    )
  }
}
export const Author = connect(mapStateToProps)(AuthorContainer)

export default Author