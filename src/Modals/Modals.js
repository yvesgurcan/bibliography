import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import {Overlay} from "./../Boilerplate/Overlay"
import View from "./../Boilerplate/View"

import LoginModal from "./LoginModal"

class ModalsContainer extends Component {
    render = () => {
        return (
        <View style={{position: "fixed"}}>
            <Overlay/>
            <LoginModal/>
        </View>
        )
    }
}
export const Modals = connect(mapStateToProps)(ModalsContainer)

export default Modals