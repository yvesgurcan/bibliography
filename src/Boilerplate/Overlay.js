import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../Store/mapStateToProps"

import View from "./../Boilerplate/View"

class OverlayBackgroundContainer extends Component {
    render = () => {
        return (
        <View style={this.props.showModal ? {position: "fixed", width: "calc(100% - 16px)", overflowY: "scroll"} : null}>
            {this.props.children}
        </View>
        )
    }
}
export const OverlayBackground = connect(mapStateToProps)(OverlayBackgroundContainer)

class OverlayContainer extends Component {
    render = () => {
        return (
            <View hidden={!this.props.showModal} style={{position: "fixed", zIndex: 700, width: "100%", height: "100%", background: "gray", opacity: 0.35, marginLeft: -8, marginTop: -8}} />
        )
    }
}
export const Overlay = connect(mapStateToProps)(OverlayContainer)