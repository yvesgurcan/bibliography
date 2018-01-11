import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Link from "./../Boilerplate/Link"
import View from "./../Boilerplate/Text"

class NameContainer extends Component {
  render = () => {
    return (
      <View>
        <h2 style={{margin: 0, marginRight: 5, display: "inline-block"}}>{this.props.children || <Link>{this.props.reference.url}</Link>}</h2>
      </View>
    )
  }
}
export const Name = connect(mapStateToProps)(NameContainer)

class NameEditContainer extends Component {

  saveChange = (input) => {
    let value = input.value
    if (this.props.addMode) {
      this.props.dispatch({type: "EDIT_NEW_REFERENCE_NAME", name: value})
    }
    else {
      if (input.inputType === "checkbox") {
        value = input.checked
      }
      this.props.dispatch({type: "SAVE_CHANGES", url: this.props.reference.url, name: input.name, value: value})  
    }
  }

  render = () => {
    if (!this.props.editMode && !this.props.addMode) return null
    return (
      <View>
          <Label>Name:</Label>
          <TextInput name="name" onChange={this.saveChange} value={this.props.addMode ? this.props.newReferenceName : this.props.reference.name} style={{width: "100%"}}/>
      </View>
    )
  }
}
export const NameEdit = connect(mapStateToProps)(NameEditContainer)
