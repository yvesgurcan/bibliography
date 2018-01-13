import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Label from "./Label"
import Text from "./Text"

class TextInputContainer extends Component {
  onChange = (input) => {
    if (!this.props.onChange) {
      console.error("TextInput '" + this.props.name + "' does not have an onChange prop.")
      return null
    }
    let alteredInput = input.target
    alteredInput.inputType = "textbox"
    this.props.onChange(alteredInput)
  }
  render = () => {
    let props = {...this.props}
    return (
      <input name={this.props.name} disabled={this.props.disabled || this.props.sortMode} onChange={this.onChange} value={this.props.value || ""} style={{padding: 5, marginBottom: 10, border: "1px solid lightgray", ...props.style}}/>
    )
  }
}
export const TextInput = connect(mapStateToProps)(TextInputContainer)

class TextAreaContainer extends Component {
  onChange = (input) => {
    if (!this.props.onChange) {
      console.error("TextArea '" + this.props.name + "' does not have an onChange prop.")
      return null
    }
    let alteredInput = input.target
    alteredInput.inputType = "textarea"
    this.props.onChange(alteredInput)
  }
  render = () => {
    let props = {...this.props}
    return (
      <textarea name={this.props.name} disabled={props.disabled || props.sortMode} onChange={this.onChange} value={props.value || ""} style={{padding: 5, marginBottom: 10, border: "1px solid lightgray", width: "100%", ...props.style}}/>
    )
  }
}
export const TextArea = connect(mapStateToProps)(TextAreaContainer)

class CheckboxContainer extends Component {
  onChange = (input) => {
    if (!this.props.onChange) {
      console.error("Checkbox '" + this.props.name + "' does not have an onChange prop.")
      return null
    }
    let alteredInput = input.target
    alteredInput.inputType = "checkbox"
    this.props.onChange(alteredInput)
  }
  render = () => {
    let props = {...this.props}
    return (
      <Text>
        <input name={this.props.name} disabled={props.disabled || props.sortMode} type="checkbox" onChange={this.onChange} checked={props.value || ""} style={{padding: 5, marginBottom: 10, border: "1px solid lightgray", ...props.style}}/>
        <Label>{this.props.children}</Label>
      </Text>
    )
  }
}
export const Checkbox = connect(mapStateToProps)(CheckboxContainer)