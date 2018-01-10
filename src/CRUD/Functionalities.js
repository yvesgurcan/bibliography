import React, { Component } from "react"

import Text from "./../Boilerplate/Text"

import {Edit, CancelEdit} from "./Edit"
import Sort from "./Sort"
import Delete from "./Delete"

class Functionalities extends Component {

  onClick = (event) => {
    event.stopPropagation()
  }

  render = () => (
    <Text onClick={this.onClick} style={{fontSize: "80%", fontWeight: "bold", color: "steelblue", textDecoration: "underline", cursor: "pointer", userSelect: "none", height: "100%", padding: 8}}>
      <Edit reference={this.props.reference} editMode={this.props.editMode} handleEdit={this.props.handleEdit}/>
      <CancelEdit reference={this.props.reference} editMode={this.props.editMode} handleCancelEdit={this.props.handleCancelEdit}/>
      <Sort reference={this.props.reference}/>
      <Delete reference={this.props.reference}/>
    </Text>
  )
}

export default Functionalities