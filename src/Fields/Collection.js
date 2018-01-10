import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {OrderedList, ListItem} from "./../Boilerplate/Lists"
import Link from "./../Boilerplate/Link"
import Text from "./../Boilerplate/Text"

import Author from "./Author"
import Type from "./Type"

class CollectionContainer extends Component {
  render = () => {
    if (!this.props.reference.collection) return null
    return (
      <OrderedList>
        {
          this.props.reference.collection.map(item => (
            <IndividualCollectionItem key={item.url || item.name} item={item} />
          ))
        }
      </OrderedList>
    )
  }
}
export const Collection = connect(mapStateToProps)(CollectionContainer)

export class IndividualCollectionItem extends Component {
  render = () => (
    <ListItem>
      <Link href={this.props.item.url} target="_blank">{this.props.item.name}</Link>
      {" "}
      <Text>
        {
          this.props.item.type || this.props.item.author
          ?
            <Text>
              (
              <Type isItem>{this.props.item.type}</Type>
              {this.props.item.type && this.props.item.author ? " " : null}
              <Author isItem>{this.props.item.author}</Author>
              )
            </Text>
          : null
        }
      </Text>
      </ListItem>
  )
}