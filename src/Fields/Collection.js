import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {TextInput} from "./../Boilerplate/Input"
import {OrderedList, ListItem} from "./../Boilerplate/Lists"
import Link from "./../Boilerplate/Link"
import Minus from "./../Boilerplate/Minus"
import Plus from "./../Boilerplate/Plus"
import Label from "./../Boilerplate/Label"
import Text from "./../Boilerplate/Text"
import View from "./../Boilerplate/View"

import Author from "./Author"
import Type from "./Type"

class CollectionContainer extends Component {

  addCollectionItem = () => {
    this.props.dispatch({type: "ADD_COLLECTION_ITEM", url: this.props.reference.url})
  }

  removeCollectionItem = () => {
    this.props.dispatch({type: "REMOVE_COLLECTION_ITEM", url: this.props.reference.url})
  }

  render = () => {
    let reference = this.props.reference
    if (this.props.editMode) {
      return (
        <View>
          <Label>Collection:</Label>
          <View style={{display: "inline-block", marginBottom: 2}}>
            <Plus onClick={this.addCollectionItem}/> <Minus hidden={!reference.collection || reference.collection.length === 0} onClick={this.removeCollectionItem}/>
          </View>
          {
            !reference.collection ? null : reference.collection.map((item, index) => (
              <IndividualCollectionItem index={index} total={reference.collection.length} editMode={true} key={item.url || item.name || index} item={item} />
            ))
          }
        </View>
      )
    }
    if (!reference.collection) return null
    return (
      <OrderedList>
        {
          reference.collection.map(item => (
            <IndividualCollectionItem key={item.url || item.name} item={item} />
          ))
        }
      </OrderedList>
    )
  }
}
export const Collection = connect(mapStateToProps)(CollectionContainer)

export class IndividualCollectionItem extends Component {
  render = () => {
    let item = this.props.item
    if (this.props.editMode) {
      return (
        <View>
          <TextInput name="name" placeholder="name" value={item.name} />
          {" "}
          <TextInput name="url" placeholder="url" value={item.url} />
          {" "}
          <TextInput name="type" placeholder="type" value={item.type} />
          {" "}
          <TextInput name="author" placeholder="author" value={item.author} />
          <View hidden={this.props.index === this.props.total - 1} style={{border: "1px solid lightgray", marginTop: -6, marginBottom: 4}}/>
        </View>
      )
    }
    return (
      <ListItem>
        <Link href={this.props.item.url} target="_blank">{this.props.item.name}</Link>
        {" "}
        <Text>
          {
            this.props.item.type || this.props.item.author
            ?
              <Text>
                (
                <Type isItem>{item.type}</Type>
                {item.type && item.author ? " " : null}
                <Author isItem>{item.author}</Author>
                )
              </Text>
            : null
          }
        </Text>
      </ListItem>
    )
  }
}