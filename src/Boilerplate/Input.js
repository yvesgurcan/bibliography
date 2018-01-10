import React, { Component } from "react"
import Label from "./Label"
import Text from "./Text"

export class TextInput extends Component {
  onChange = (input) => {
    if (!this.props.onChange) {
      console.error("TextInput '" + this.props.name + "' does not have an onChange prop.")
      return null
    }
    let alteredInput = input.target
    alteredInput.type = "textbox"
    this.props.onChange(alteredInput)
  }
  render = () => (
    <input {...this.props} onChange={this.onChange} value={this.props.value || ""} style={{padding: 5, marginBottom: 10, border: "1px solid lightgray", ...this.props.style}}/>
  )
}

export class TextArea extends Component {
  onChange = (input) => {
    if (!this.props.onChange) {
      console.error("TextArea '" + this.props.name + "' does not have an onChange prop.")
      return null
    }
    let alteredInput = input.target
    alteredInput.type = "textarea"
    this.props.onChange(alteredInput)
  }
  render = () => (
    <textarea {...this.props} onChange={this.onChange} value={this.props.value || ""} style={{padding: 5, marginBottom: 10, border: "1px solid lightgray", width: "100%", ...this.props.style}}/>
  )
}

export class Checkbox extends Component {
  onChange = (input) => {
    if (!this.props.onChange) {
      console.error("Checkbox '" + this.props.name + "' does not have an onChange prop.")
      return null
    }
    let alteredInput = input.target
    alteredInput.type = "checkbox"
    this.props.onChange(alteredInput)
  }
  render = () => {
    let props = {...this.props}
    delete props.children
    return (
      <Text>
        <input {...props} type="checkbox" onChange={this.onChange} checked={this.props.value || ""} style={{padding: 5, marginBottom: 10, border: "1px solid lightgray", ...this.props.style}}/>
        <Label>{this.props.children}</Label>
      </Text>
    )
  }
}