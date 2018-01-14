import React, { Component } from "react"
import {Provider, connect} from "react-redux"
import mapStateToProps, {store} from "./mapStateToProps"

import Overlay from "./Boilerplate/Overlay"
import View from "./Boilerplate/View"

import Add from "./CRUD/Add"
import Login from "./CRUD/Login"
import Refresh from "./CRUD/Refresh"
import Feedback from "./CRUD/Feedback"

import LoginModal from "./Modals/LoginModal"

import Search from "./Search/Search"

import NewReferenceCard from "./References/NewReferenceCard"
import ReferenceCard from "./References/ReferenceCard"

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

class ListPageContainer extends Component {

  componentDidMount = () => {
    // responsiveness
    this.updateWidth()
    window.addEventListener("resize", this.updateWidth)
    this.props.dispatch({type: "UPDATE_CONNECTION_STATUS", isOnline: navigator.onLine})
    // connectivity
    window.addEventListener('offline', this.isOffline)
    window.addEventListener('online', this.isOnline)
  }


  updateWidth = () => {
    store.dispatch({type: "CURRENT_WIDTH", width: window.innerWidth})
  }

  isOffline = () => {
    this.props.dispatch({type: "UPDATE_CONNECTION_STATUS", isOnline: false})
  }

  isOnline = () => {
    this.props.dispatch({type: "UPDATE_CONNECTION_STATUS", isOnline: true})
  }

  render = () => (
    <View>
      <Feedback />
      <Overlay>
        <View style={{textAlign: "right"}}>
          <Login/>
          <Refresh/>
        </View>
        <PageTitle>A Programmer's Bibliography</PageTitle>
        <Search/>
        <ReferenceList/>
      </Overlay>
      <LoginModal/>
    </View>
  )
}
const ListPage = connect(mapStateToProps)(ListPageContainer)

/* list of references */

class ReferenceListContainer extends Component {

  state = {
    addMode: false
  }

  componentDidMount = () => {
    store.dispatch({type: "INIT"})   
    store.dispatch({type: "GET_REFERENCES"})
  }

  componentDidUpdate = () => {
    if (this.props.references) {
      let hash = this.props.lowerCase(window.location.hash.replace("#",""))
      if (!this.props.hashtag) {
        let id = this.props.matchReferenceId(hash)
        if (hash === "new" || hash === "add" || hash === "create") {
          id = "new"
          this.props.dispatch({type: "ADD_MODE_ON"})
        }
        if (id !== null) {
          if (!document.getElementById(id) && id !== "new") return null
          setTimeout(() => {
            document.getElementById(id).scrollIntoView({ 
                behavior: "smooth"
            })
          }, 500)
        }
      }
    }
  }

  addSortEventListener = (referenceId) => {
    
    let referenceCard = document.getElementById(referenceId)    
    referenceCard.style.left = (referenceCard.style.left.replace("px","") + 5) + "px"

    let positions = []
    let referenceIds = this.props.filteredReferences.map((reference, index) => ({id: this.props.getAnchorId(reference), index: index - 1}))
    referenceIds = referenceIds.filter(refCard => refCard.id !== referenceId)
    positions = referenceIds.map(referenceId => {
      return {id: referenceId.id, index: referenceId.index, y: document.getElementById(referenceId.id).offsetTop - 200}
    })

    this.props.dispatch({type: "EVENT_LISTENER_ARGUMENTS", arguments: {referenceCard: referenceCard, positions: positions}})
  }

  dragReferenceCard = (event) => {

    if (!this.props.sortMode) return null

    let args = this.props.eventListenerArgs
    let referenceCard = args.referenceCard
    let positions = args.positions

    // reset placeholders visibility
    positions.map(refCard =>  document.getElementById("placeholder_" + refCard.id).style.display = "none")
    document.getElementById("placeholder_last").style.display = "none"

    // get pointer position
    let currentY = (event.clientY - referenceCard.getBoundingClientRect().height/2)
    let currentX = (event.clientX - referenceCard.getBoundingClientRect().width/2)

    // move the center of the dragged reference card under the pointer
    referenceCard.style.top = currentY + "px"
    referenceCard.style.left = currentX + "px"

    // set the absolute Y coordinate used to compare the other reference cards to
    let absoluteY = event.pageY - 50

    // go through each reference and create an object which contains its id, its Y coordinate relative to the pointer, and its absolute Y coordinate
    let aboveRelative = []
    let belowRelative = []
    let processedPositions = positions.map((refCard, index) => {
      let relativePosition = refCard.y - absoluteY
      let object = {id: refCard.id, index: refCard.index, relativeY: relativePosition, absoluteY: refCard.y}
      // sort the reference cards based on their position compared to the pointer
      if (relativePosition < 0) {
        aboveRelative = [...aboveRelative, object.absoluteY]
      }
      else {
        belowRelative = [...belowRelative, object.absoluteY]
      }
      return object
    })

    // find the relative Y coordinates that are surrounding the pointer
    let closestAbove = Math.max.apply(null, aboveRelative)
    let closestBelow = Math.min.apply(null, belowRelative)

    // get the reference card objects that correspond to the surrounding relative Y coordinates
    let closestRefAbove = processedPositions.filter(refObject => refObject.absoluteY === closestAbove)
    let closestRefBelow = processedPositions.filter(refObject => refObject.absoluteY === closestBelow)

    let placeholderId = null
    let placeholderIndex = 0
    // the pointer is at the top of the page, there are no cards above it
    if (closestRefAbove.length === 0) {
      placeholderId = "placeholder_" + positions[0].id
      placeholderIndex = positions[0].index
    }
    else {
      placeholderId = "placeholder_" + closestRefAbove[0].id
      placeholderIndex = closestRefAbove[0].index
    }

    if (closestRefBelow.length === 0) {
      let lastRefCardObject = closestRefAbove[closestRefAbove.length - 1]
      let lastRefCard = document.getElementById(lastRefCardObject.id)
      let offsetToBottom = lastRefCard.getBoundingClientRect().height
      if (absoluteY > lastRefCardObject.absoluteY + offsetToBottom) {
        placeholderId = "placeholder_last"    
        placeholderIndex = this.props.filteredReferences.length - 1    
      }
    }

    // grab the DOM element
    let placeholder = document.getElementById(placeholderId)

    // show placeholder
    placeholder.style.display = "block"
    if (this.props.placeholderIndex === placeholderIndex) return null
    this.props.dispatch({type: "SET_PLACEHOLDER_INDEX", placeholderIndex: placeholderIndex})

  }

  dropReferenceCard = (event) => {

    if (!this.props.sortMode) return null

    let args = this.props.eventListenerArgs
    let positions = args.positions

    // reset placeholders visibility
    positions.map(refCard =>  document.getElementById("placeholder_" + refCard.id).style.display = "none")
    document.getElementById("placeholder_last").style.display = "none"

    this.props.dispatch({type: "RESORT_TARGET"})
  }

  render() {
    if (!this.props.references) return null
    return (
      <View onMouseMove={this.dragReferenceCard} onClick={this.dropReferenceCard}>
        <Add />
        <NewReferenceCard/>
        {this.props.filteredReferences.map((reference, index) => (
          <ReferenceCard key={reference.url || reference.name || reference.descriptions} index={index} reference={reference} addSortEventListener={this.addSortEventListener}/>
        ))}
        <View id={"placeholder_last"} style={{display: "none", height: "50px", marginTop: "10px", border: "3px dashed lightgray"}} />
      </View>
    )
  }
}
const ReferenceList = connect(mapStateToProps)(ReferenceListContainer)

export default AppContainer
