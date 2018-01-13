import React, { Component } from "react"
import {Provider, connect} from "react-redux"
import mapStateToProps, {store} from "./mapStateToProps"

import View from "./Boilerplate/View"

import Add from "./CRUD/Add"
import Refresh from "./CRUD/Refresh"
import Feedback from "./CRUD/Feedback"

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
    this.updateWidth()
    window.addEventListener("resize", this.updateWidth)
  }

  updateWidth = () => {
    store.dispatch({type: "CURRENT_WIDTH", width: window.innerWidth})
  }

  render = () => (
    <View>
      <Feedback />
      <PageTitle>A Programmer's Bibliography</PageTitle>
      <Search/>
      <ReferenceList/>
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
    let id = this.props.matchReferenceId(referenceId, true)
    
    let referenceCard = document.getElementById(referenceId)
    console.log(referenceCard.style)
    this.props.dispatch({type: "BACKUP_ORIGINAL_STYLE", style: {...referenceCard.style}})
    
    referenceCard.style.left = (referenceCard.style.left.replace("px","") + 5) + "px"
    referenceCard.style.position = "absolute"
    referenceCard.style.zIndex = 900
    referenceCard.style.width = (document.getElementById("root").offsetWidth - 42) + "px"
    referenceCard.style.boxShadow = "6px 6px 2px 1px rgba(0, 0, 0, .2)"

    let positions = []
    let referenceIds = this.props.filteredReferences.map(reference => this.props.removeDangerousCharacters(this.props.lowerCase(reference.anchor || reference.name)) || null)
    referenceIds = referenceIds.filter(refCard => refCard !== referenceId)
    positions = referenceIds.map(referenceId => {
      return {id: referenceId, y: document.getElementById(referenceId).getBoundingClientRect().top}
    })

    document.addEventListener("mousemove", (event) => this.dragReferenceCard(event, referenceCard, positions))
    document.addEventListener("click", (event) => this.dropReferenceCard(event, referenceCard))
  }

  dragReferenceCard = (event, referenceCard, positions) => {
    let currentY = (event.clientY - 60)
    referenceCard.style.top = currentY + "px"

    let abovePositions = []
    let above = positions.filter((refCard, index) => {
      abovePositions = [...abovePositions, refCard.y]
      return refCard.y < currentY
    })
    let closestAbove = null//Math.min.apply(null, abovePositions)

    let belowPositions = []
    let below = positions.filter((refCard, index) => {
      belowPositions = [...belowPositions, refCard.y]
      return refCard.y > currentY
    })
    let closestBelow = null//Math.max.apply(null, belowPositions)

    console.log({y: currentY, above: above, below: below, closestAbove: closestAbove, closestBelow: closestBelow})

  }

  dropReferenceCard = (event, referenceCard) => {
    console.log(event)
    
    document.removeEventListener("mousemouve", this.dragReferenceCard)
    document.removeEventListener("click", this.dropReferenceCard)

  }

  render() {
    if (!this.props.references) return null
    return (
      <View>
        <Refresh />
        <Add />
        <NewReferenceCard/>
        {this.props.filteredReferences.map(reference => (
          <ReferenceCard key={reference.url || reference.name || reference.descriptions} reference={reference} addSortEventListener={this.addSortEventListener}/>
        ))}
      </View>
    )
  }
}
const ReferenceList = connect(mapStateToProps)(ReferenceListContainer)

export default AppContainer
