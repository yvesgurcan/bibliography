import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import Label from "./../Boilerplate/Label"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

class SearchContainer extends Component {
  onChange = (event) => {
    this.props.dispatch({type: "UPDATE_SEARCH_STRING", string: event.target.value})
  }
  render() {
    return (
      <View>
        <Label>Search:</Label>
        <View style={{display: "inline-block", marginBottom: 20, height: 28}}>
          <TextInput value={this.props.search ? this.props.search.history[this.props.search.index] : ""} style={{minWidth: 250, height: 14.5}} onChange={this.onChange}/>
          <PreviousSearch/>
          <NextSearch/>
          <ClearSearch/>
          <View style={{display: "inline-block", marginLeft: 5}}>
            <AndSearch/>
            <NotSearch/>
          </View>
        </View>
      </View>
    )
  }
}
const Search = connect(mapStateToProps)(SearchContainer)

class PreviousSearchContainer extends Component {
  previousSearch = () => {
    this.props.dispatch({type: "PREVIOUS_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.previousSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      &lt;
    </Text>
  )
}
const PreviousSearch = connect(mapStateToProps)(PreviousSearchContainer)

class NextSearchContainer extends Component {
  nextSearch = () => {
    this.props.dispatch({type: "NEXT_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.nextSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      &gt;
    </Text>
  )
}
const NextSearch = connect(mapStateToProps)(NextSearchContainer)

class ClearSearchContainer extends Component {
  clearSearch = () => {
    this.props.dispatch({type: "CLEAR_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.clearSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      &times;
    </Text>
  )
}
const ClearSearch = connect(mapStateToProps)(ClearSearchContainer)

class AndSearchContainer extends Component {
  clearSearch = () => {
    this.props.dispatch({type: "ADD_AND_TO_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.clearSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      and
    </Text>
  )
}
const AndSearch = connect(mapStateToProps)(AndSearchContainer)

class NotSearchContainer extends Component {
  clearSearch = () => {
    this.props.dispatch({type: "ADD_NOT_TO_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.clearSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      not
    </Text>
  )
}
const NotSearch = connect(mapStateToProps)(NotSearchContainer)

export default Search