import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

class SubtitleContainer extends Component {

  saveChange = (input) => {
    this.props.dispatch({type: "SAVE_CHANGES", url: this.props.reference.url, name: input.name, value: input.value})
  }

  render = () => {
    if (this.props.editMode) {
      return (
        <View>
          <Label>Subtitle:</Label>
          <TextInput name="subtitle" value={this.props.children} onChange={this.saveChange} />
        </View>
      )
    }
    return (
      <View style={{marginBottom: 5}}>{this.props.children}</View>      
    )
  }
}
export const Subtitle = connect(mapStateToProps)(SubtitleContainer)

export default Subtitle