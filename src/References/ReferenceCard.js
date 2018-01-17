import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Link from "./../Boilerplate/Link"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

import Functionalities from "./../CRUD/Functionalities"
import {Anchor, AnchorEdit} from "./../Fields/Anchor"
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

  componentWillUpdate = (nextProps, nextState) => {
    // store has signalled that the user wants to edit this reference but was not asked to sign in yet
    if (this.props.openEditForm && this.props.allowEdit && !nextState.editMode) {
      if (this.props.openEditForm === this.props.reference.url) {
        this.setState({editMode: true}, function() {
          this.props.dispatch({type: "REMOVE_OPEN_EDIT_FORM"})
          let backupReference = {...this.props.reference}
          this.props.dispatch({type: "BACKUP_REFERENCE", reference: backupReference})
        })
      }
    }
  }

  onHover = (event) => {
    if (this.props.reference.collection || this.state.editMode || this.props.reference.deleted || this.props.sortMode || !this.props.reference.url || !this.props.isOnline) return null
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {
    if (!this.props.isOnline) {
      this.props.dispatch({type: "DO_NOT_FOLLOW_LINK_MESSAGE"})
      return null
    }
    if (this.props.reference.collection || this.state.editMode || this.props.reference.deleted || this.props.sortMode || !this.props.reference.url) return null
    this.setState({dynamicStyle: this.state.clickedStyle})
    setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    this.openUrl()
    event.stopPropagation()
  }

  openUrl = () => {
      if (this.props.sortMode || !this.props.reference.url) return null 
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
    let reference = {...this.props.reference}
    if (this.state.editMode) {
      this.setState({editMode: false})
      this.props.dispatch({type: "CLEANUP", url: reference.url})
      this.props.dispatch({type: "REMOVE_BACKUP", url: this.props.reference.url})
    }
    else {
      if (!this.props.allowEdit) {
        this.props.dispatch({type: "SHOW_MODAL", id: "login", url: reference.url})
      }
      else {
        this.setState({editMode: true})
        let backupReference = {...reference}
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
    let referenceId = this.props.getAnchorId(reference)
    this.props.dispatch({type: "SORT_MODE_ON", referenceIndex: this.props.index})
    this.props.addSortEventListener(referenceId)
  }

  saveRemotely = (input) => {
    let reference = this.props.reference
    this.props.dispatch({type: "SAVE_REMOTELY", url: reference.url, name: input.name})
  }

  render = () => {
    if (!this.props.reference) return null
    let reference = {...this.props.reference}
    return (
      <View>
        <View className="placeholder" id={"placeholder_" + this.props.getAnchorId(reference)} style={{display: "none", height: "50px", marginTop: "10px", border: "3px dashed lightgray"}} />
        <View className="referenceCard" id={this.props.getAnchorId(reference)} style={this.props.sortMode && this.props.sortIndex === this.props.index ? {userSelect: "none", position: "fixed", zIndex: 900, width: (document.getElementById("root").offsetWidth - 42), boxShadow: "6px 6px 2px 1px rgba(0, 0, 0, .2)", background: "white", border: "1px solid lightgray", padding: 20, marginTop: 10} : {userSelect: this.props.sortMode ? "none" : null, background: "white", border: "1px solid lightgray", padding: 20, marginTop: 10, width: "calc(100%-20px)"}}>
          <View onClick={this.onClick} onMouseEnter={this.onHover} onMouseLeave={this.onMouseLeave} onMouseOut={this.onMouseOut} style={{cursor: "pointer", ...this.state.dynamicStyle}}>
              <View hidden={!reference.deleted}>
                  <Name reference={reference} style={{textDecoration: "line-through"}}>{reference.name}</Name>
                  <Functionalities reference={reference} handleDelete={this.handleDelete} handleConfirmDelete={this.handleConfirmDelete} handleCancelDelete={this.handleCancelDelete} />     
              </View>
            <View hidden={reference.deleted}>
              <View>
                <Name editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>
                  {reference.name}
                </Name>
                <Text onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
                  <Functionalities reference={reference} editMode={this.state.editMode} handleEdit={this.handleEdit} handleCancelEdit={this.handleCancelEdit} handleSort={this.handleSort} handleDelete={this.handleDelete}/>
                </Text>
              </View>
              <URL editMode={this.state.editMode} reference={reference} />
              <NameEdit editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}/>
              <AnchorEdit editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}/>
              {
                this.state.editMode
                ?
                  <Subtitle editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>
                    {reference.subtitle}
                  </Subtitle>
                :
                <Link href={this.props.reference.url} fakeLink noStyle>
                  <Subtitle editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>
                    {reference.subtitle}
                  </Subtitle>
                </Link>  
              }
              <View onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
                <Type editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>
                  {reference.type}
                </Type>
                <Author editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>
                  {reference.author}
                </Author>
              </View>
              {
                this.state.editMode 
                ?
                <Description editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>
                  {reference.description}
                </Description>
                :
                <Link href={reference.url} fakeLink noStyle>
                  <Description editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>
                    {reference.description}
                  </Description>
                </Link>
              }
              <View onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
                <Collection editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}/>
                <Tags editMode={this.state.editMode} saveRemotely={this.saveRemotely} reference={reference}>{reference.tags}</Tags>
                <Anchor reference={reference}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export const ReferenceCard = connect(mapStateToProps)(ReferenceCardContainer)

export default ReferenceCard