import React, { Component } from "react"

import HorizontalRuler from "./../Boilerplate/HorizontalRuler"
import View from "./../Boilerplate/View"

export class PageTitle extends Component {
  render = () => (
    <h1>{this.props.children}</h1>
  )
}

export class ReferenceName extends Component {
  render = () => (
    <h2 style={{margin: 0}}>{this.props.children}</h2>
  )
}

export class ModalTitle extends Component {
  render = () => (
    <View style={{marginBottom: 10}}>
      <h3 style={{margin: 0}}>{this.props.children}</h3>
      <HorizontalRuler/ >
    </View>
  )
}