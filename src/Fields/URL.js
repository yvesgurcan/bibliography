import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import View from "./../Boilerplate/Text"

class URLContainer extends Component {

  saveChange = (input) => {
    let value = input.value

    if (this.props.addForm) {
      this.props.dispatch({type: "EDIT_NEW_REFERENCE_URL", url: value})
    }
    else {
      if (input.inputType === "checkbox") {
        value = input.checked
      }
      this.props.dispatch({type: "SAVE_URL_CHANGE", oldUrl: this.props.reference.url, newUrl: value})  
    }

  }

  swapUrl = (input) => {
    if (this.props.addForm) return null
    this.props.dispatch({type: "SWAP_URLS", url: this.props.reference.url})
  }

  render = () => {
    let reference = {...this.props.reference}
    if ((reference.collection && reference.collection.length > 0) || (!this.props.addForm && !this.props.editMode) || (this.props.addForm && !this.props.addMode)) return null
    return (
      <View>
          <Label>URL:</Label>
          <TextInput name="url" onChange={this.saveChange} onBlur={this.swapUrl} value={this.props.addForm ? this.props.newReferenceUrl : reference.newUrl || reference.url} style={{width: "100%"}}/>
      </View>
    )
  }
}
export const URL = connect(mapStateToProps)(URLContainer)

export default URL