import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Link from "./../Boilerplate/Link"
import Small from "./../Boilerplate/Small"
import View from "./../Boilerplate/View"
import Text from "./../Boilerplate/Text"

class AnchorEditContainer extends Component {

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
          <Label>Anchor:</Label>
          <TextInput name="name" onChange={this.saveChange} value={this.props.reference.anchor} style={{width: "100%"}}/>
          <View><Small>Please note that anchors are not case sensitive. All uppercase characters are automatically replaced by their lowercase counterpart.</Small></View>
      </View>
    )
  }
}
export const AnchorEdit = connect(mapStateToProps)(AnchorEditContainer)

export default AnchorEdit