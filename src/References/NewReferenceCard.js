import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import View from "./../Boilerplate/View"

import Create from "./../CRUD/Create"

import {Name, NameEdit} from "./../Fields/Name"
import URL from "./../Fields/URL"

class NewReferenceCardContainer extends Component {
  render = () => {
    if (!this.props.addMode) {
      return null
    }
    return (
      <View id="new" style={{border: "1px solid lightgray", padding: 20, marginTop: 10}}>
        <View style={{marginBottom: 5}}>
          <Name>New Reference</Name>
        </View>
        <URL addForm />
        <NameEdit addForm />
        <Create />
      </View>
    )
  }
}
const NewReferenceCard = connect(mapStateToProps)(NewReferenceCardContainer)

export default NewReferenceCard