import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps, {store} from "./../mapStateToProps"

import View from "./../Boilerplate/View"

class OverlayContainer extends Component {
    render = () => {
        return (
        <View style={{position: "fixed"}}>
            {this.props.children}
        </View>
        )
    }
}
export const Overlay = connect(mapStateToProps)(OverlayContainer)

export default Overlay