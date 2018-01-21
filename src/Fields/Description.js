import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../Store/mapStateToProps"

import {TextArea} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import View from "./../Boilerplate/View"

class DescriptionContainer extends Component {

  saveChange = (input) => {
    this.props.dispatch({type: "SAVE_CHANGES", url: this.props.reference.url, name: input.name, value: input.value})
  }

  render = () => {
    if (this.props.editMode) {
      return (
        <View>
          <Label>Description:</Label>
          <TextArea name="description" value={this.props.children} onChange={this.saveChange} onBlur={this.props.saveRemotely} style={{resize: "vertical"}} />
        </View>
      )
    }
    return (
      <View style={{marginTop: 8}}>{this.props.children}</View>
    )
  }
}
export const Description = connect(mapStateToProps)(DescriptionContainer)

export default Description