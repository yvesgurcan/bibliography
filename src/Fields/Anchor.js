import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Link from "./../Boilerplate/Link"
import SmallText from "./../Boilerplate/SmallText"
import View from "./../Boilerplate/View"

class AnchorContainer extends Component {
  stopPropagation = (event) => {
    event.stopPropagation()
  }
  render = () => {
    if (this.props.editMode) return null
    let reference = this.props.reference
    let anchor = this.props.getAnchorId(reference)
    if (!anchor) return null
    return (
      <View onClick={this.stopPropagation} style={{marginTop: 10}}>
          <Link href={"#" + anchor} target={"_self"}>#{anchor}</Link>
      </View>
    )
  }
}
export const Anchor = connect(mapStateToProps)(AnchorContainer)

class AnchorEditContainer extends Component {

  saveChange = (input) => {
    let value = this.props.lowerCase(this.props.removeDangerousCharacters(input.value))
    if (value !== input.value) {
      this.props.dispatch({type: "SHOW_CASE_INSENSITIVE_WARNING"})
    }
    if (this.props.addMode) {
      this.props.dispatch({type: "EDIT_NEW_REFERENCE_NAME", name: value})
    }
    else {
      this.props.dispatch({type: "SAVE_CHANGES", url: this.props.reference.url, name: input.name, value: value})  
    }
  }

  render = () => {
    if (!this.props.editMode) return null
    let reference = this.props.reference
    return (
      <View style={{marginBottom: 10}}>
          <Label>Anchor:</Label>
          <TextInput name="anchor" onChange={this.saveChange} value={this.props.removeDangerousCharacters(this.props.lowerCase(reference.anchor || reference.name))} style={{width: "100%", marginBottom: 0}}/>
          <SmallText>{this.props.caseInsensitiveAnchors}</SmallText>
      </View>
    )
  }
}
export const AnchorEdit = connect(mapStateToProps)(AnchorEditContainer)