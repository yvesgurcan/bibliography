import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

import Functionalities from "./../CRUD/Functionalities"
import AnchorEdit from "./../Fields/Anchor"
import Author from "./../Fields/Author"
import {Collection} from "./../Fields/Collection"
import Description from "./../Fields/Description"
import {Name, NameEdit} from "./../Fields/Name"
import Subtitle from "./../Fields/Subtitle"
import Tags from "./../Fields/Tags"
import Type from "./../Fields/Type"
import URL from "./../Fields/URL"

class ReferenceCardContainer extends Component {

  state = {
    normalStyle: {
      opacity: null
    },
    hoverStyle: {
      opacity: 0.69
    },
    clickedStyle: {
      opacity: 0.3
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  onHover = (event) => {
    if (this.props.reference.collection || this.state.editMode || this.props.reference.deleted || this.props.sortMode) return null
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {
    if (this.props.reference.collection || this.state.editMode || this.props.reference.deleted || this.props.sortMode) return null
    this.setState({dynamicStyle: this.state.clickedStyle})
    setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    this.OpenUrl()
    event.stopPropagation()
  }

  OpenUrl = () => {
      if (this.props.sortMode) return null 
    window.open(this.props.reference.url, "_blank")
  }

  onMouseLeave = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  onHoverFunctionalities = (event) => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  handleEdit = () => {
    if (this.props.sortMode) return null
    if (this.state.editMode) {
      this.setState({editMode: false})
      this.props.dispatch({type: "CLEANUP", url: this.props.reference.url})
      this.props.dispatch({type: "REMOVE_BACKUP", url: this.props.reference.url})
    }
    else {
      if (!this.props.allowEdit) {
        // TODO prompt for username and password
      }
      else {
        this.setState({editMode: true})
        let backupReference = {...this.props.reference}
        this.props.dispatch({type: "BACKUP_REFERENCE", reference: backupReference})
      }
    }
  }

  handleCancelEdit = () => {
    if (this.props.sortMode) return null
    if (this.state.editMode && this.props.allowEdit) {
      this.setState({editMode: false})
      this.props.dispatch({type: "CANCEL_EDIT", url: this.props.reference.url})
    }
  }

  handleDelete = () => {
    if (this.props.sortMode) return null
    this.props.dispatch({type: "DELETE_REFERENCE_STAGE_1", url: this.props.reference.url})
  }

  handleCancelDelete = () => {
    this.props.dispatch({type: "CANCEL_DELETION", url: this.props.reference.url})
  }

  handleConfirmDelete = () => {
    this.props.dispatch({type: "DELETE_REFERENCE_STAGE_2", url: this.props.reference.url})
  }

  handleSort = () => {
    if (this.props.sortMode) return null
    let reference = this.props.reference
    let referenceId = this.props.removeDangerousCharacters(this.props.lowerCase(reference.anchor || reference.name)) || null
    this.props.dispatch({type: "SORT_MODE_ON", referenceId: referenceId})
    this.props.addSortEventListener(referenceId)
  }

  render = () => {
    if (!this.props.reference) return null
    let reference = {...this.props.reference}
    return (
      <View id={this.props.removeDangerousCharacters(this.props.lowerCase(reference.anchor || reference.name)) || null} style={{userSelect: this.props.sortMode ? "none" : null, background: "white", border: "1px solid lightgray", padding: 20, marginTop: 10, width: "calc(100%-20px)"}}>
        <View onClick={this.onClick} onMouseEnter={this.onHover} onMouseLeave={this.onMouseLeave} onMouseOut={this.onMouseOut} style={{cursor: "pointer", ...this.state.dynamicStyle}}>
          <View hidden={!reference.deleted}>
              <Name reference={reference} style={{textDecoration: "line-through"}}>{reference.name}</Name>
              <Functionalities reference={reference} handleDelete={this.handleDelete} handleConfirmDelete={this.handleConfirmDelete} handleCancelDelete={this.handleCancelDelete} />     
          </View>
          <View hidden={reference.deleted}>
            <View>
              <Name reference={reference}>{reference.name}</Name>
              <Text onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
                <Functionalities reference={reference} editMode={this.state.editMode} handleEdit={this.handleEdit} handleCancelEdit={this.handleCancelEdit} handleSort={this.handleSort} handleDelete={this.handleDelete}/>
              </Text>
            </View>
            <URL editMode={this.state.editMode} reference={reference} />
            <NameEdit editMode={this.state.editMode} reference={reference}/>
            <AnchorEdit editMode={this.state.editMode} reference={reference}/>
            <Subtitle reference={reference} editMode={this.state.editMode}>{reference.subtitle}</Subtitle>
            <View onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
              <Type editMode={this.state.editMode} reference={reference}>
                {reference.type}
              </Type>
              <Author editMode={this.state.editMode} reference={reference}>
                  {reference.author}
              </Author>
            </View>
            <Description editMode={this.state.editMode} reference={reference}>{reference.description}</Description>
            <Collection editMode={this.state.editMode} reference={reference}/>
            <Tags editMode={this.state.editMode} reference={reference}>{reference.tags}</Tags>
          </View>
        </View>
      </View>
    )
  }
}
export const ReferenceCard = connect(mapStateToProps)(ReferenceCardContainer)

export default ReferenceCard