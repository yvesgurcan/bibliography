import React, { Component } from "react"
import {Provider, connect} from "react-redux"
import mapStateToProps, {store} from "./mapStateToProps"

import Text from "./Boilerplate/Text"
import View from "./Boilerplate/View"

import Author from "./Fields/Author"
import {Collection} from "./Fields/Collection"
import Description from "./Fields/Description"
import Type from "./Fields/Type"
import {Name, NameEdit} from "./Fields/Name"
import Subtitle from "./Fields/Subtitle"
import Tags from "./Fields/Tags"

import Functionalities from "./CRUD/Functionalities"
import Add from "./CRUD/Add"

import Search from "./Search/Search"

/* wrappers */

class AppContainer extends Component {
  render = () => (
    <Provider store={store}>
      <ListPage/>
    </Provider>
  )
}

class PageTitle extends Component {
  render = () => (
    <h1>{this.props.children}</h1>
  )
}

class ListPage extends Component {
  render = () => (
    <View>
      <PageTitle>A Programmer's Bibliography</PageTitle>
      <Search/>
      <ReferenceList/>
    </View>
  )
}

/* list of references */

class ReferenceListContainer extends Component {

  componentDidMount = () => {
    store.dispatch({type: "INIT"})   
    store.dispatch({type: "MOCK_DATA"})    
  }

  render() {
    if (!this.props.references) return null
    return (
      <View>
        <Add />
        {this.props.filteredReferences.map(reference => (
          <ReferenceCard key={reference.url || reference.name || reference.descriptions} reference={reference}/>
        ))}
      </View>
    )
  }
}
const ReferenceList = connect(mapStateToProps)(ReferenceListContainer)

/* individual references */

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
    if (this.props.reference.collection || this.state.editMode) return null
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {
    if (this.props.reference.collection || this.state.editMode) return null
    this.setState({dynamicStyle: this.state.clickedStyle})
    setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    this.OpenUrl()
    event.stopPropagation()
  }

  OpenUrl = () => {
    window.open(this.props.reference.url, "_blank")
  }

  onMouseLeave = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  onHoverFunctionalities = (event) => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  handleEdit = () => {
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
    if (this.state.editMode && this.props.allowEdit) {
      this.setState({editMode: false})
      this.props.dispatch({type: "CANCEL_EDIT", url: this.props.reference.url})
    }
  }

  render = () => {
    let reference = {...this.props.reference}
    if (!reference) return null
    return (
      <View style={{border: "1px solid lightgray", padding: 20, marginTop: 10}}>
        <View onClick={this.onClick} onMouseEnter={this.onHover} onMouseLeave={this.onMouseLeave} onMouseOut={this.onMouseOut} style={{cursor: "pointer", ...this.state.dynamicStyle}}>
          <View>
            <Name>{reference.name}</Name>
            <Text onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
              <Functionalities reference={reference} editMode={this.state.editMode} handleEdit={this.handleEdit} handleCancelEdit={this.handleCancelEdit}/>
            </Text>
          </View>
          <NameEdit editMode={this.state.editMode} reference={reference}/>
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
        </View>
        <Tags editMode={this.state.editMode} reference={reference}>{reference.tags}</Tags>
      </View>
    )
  }
}
const ReferenceCard = connect(mapStateToProps)(ReferenceCardContainer)

export default AppContainer
