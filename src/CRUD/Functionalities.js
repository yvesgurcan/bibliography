import React, { Component } from "react"

import Text from "./../Boilerplate/Text"

import {Edit, CancelEdit} from "./Edit"
import Sort from "./Sort"
import {Delete, CancelDelete, ConfirmDelete} from "./Delete"

class Functionalities extends Component {

  onClick = (event) => {
    event.stopPropagation()
  }

  render = () => {
    let reference = this.props.reference
    return (
      <Text onClick={this.onClick} style={{fontSize: "80%", fontWeight: "bold", color: "steelblue", textDecoration: "underline", cursor: "pointer", userSelect: "none", height: "100%", padding: 8}}>
        <Text hidden={this.props.reference.deleted}>
          <Edit reference={reference} editMode={this.props.editMode} onClick={this.props.handleEdit} />
          <CancelEdit reference={reference} editMode={this.props.editMode} onClick={this.props.handleCancelEdit}/>
          <Sort reference={reference} onClick={this.props.handleSort}/>
          <Delete reference={reference} onClick={this.props.handleDelete}/>
        </Text>
        <Text hidden={!this.props.reference.deleted}>
          <CancelDelete reference={reference} onClick={this.props.handleCancelDelete}/>
          <ConfirmDelete reference={reference} onClick={this.props.handleConfirmDelete}/>
        </Text>
      </Text>
    )
  }
}

export default Functionalities