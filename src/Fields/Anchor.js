import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import SmallText from "./../Boilerplate/SmallText"
import View from "./../Boilerplate/View"

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
    if (!this.props.editMode) return null
    let reference = this.props.reference
    return (
      <View style={{marginBottom: 10}}>
          <Label>Anchor:</Label>
          <TextInput name="anchor" onChange={this.saveChange} value={this.props.removeDangerousCharacters(this.props.lowerCase(reference.anchor || reference.name))} style={{width: "100%", marginBottom: 0}}/>
          <SmallText>Please note that anchors are not case sensitive. All uppercase characters are automatically replaced by their lowercase counterpart.</SmallText>
      </View>
    )
  }
}
export const AnchorEdit = connect(mapStateToProps)(AnchorEditContainer)

export default AnchorEdit