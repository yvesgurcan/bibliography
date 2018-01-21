import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../Store/mapStateToProps"

import {Overlay} from "./../Boilerplate/Overlay"
import View from "./../Boilerplate/View"

import LoginModal from "./LoginModal"
import ConfirmRefreshModal from "./ConfirmRefreshModal"

class ModalsContainer extends Component {
    render = () => {
        return (
        <View style={{position: "fixed"}}>
            <Overlay/>
            <LoginModal/>
            <ConfirmRefreshModal/>
        </View>
        )
    }
}
export const Modals = connect(mapStateToProps)(ModalsContainer)

export default Modals