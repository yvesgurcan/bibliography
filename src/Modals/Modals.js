import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {Overlay} from "./../Boilerplate/Overlay"
import View from "./../Boilerplate/View"

class ModalsContainer extends Component {
    closeModal = (event) => {
        if (event.target.id === "overlay") {
            this.props.dispatch({type: "HIDE_MODAL"})            
        }
    }
    render = () => {
        return (
            <View style={{position: "fixed"}} >
                <Overlay />
                {this.props.children}
            </View>
        )
    }
}
export const Modals = connect(mapStateToProps)(ModalsContainer)

export default Modals