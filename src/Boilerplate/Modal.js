import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps, {store} from "./../mapStateToProps"

import Overlay from "./Overlay"
import View from "./View"

class ModalContainer extends Component {
    closeModal = (event) => {
        if (event.target.id === "overlay") {
            this.props.dispatch({type: "HIDE_MODAL"})            
        }
    }
    render = () => {
        return (
            <View >
                <View hidden={!this.props.showModal} style={{position: "fixed", zIndex: 700, width: "100%", height: "100%", background: "gray", opacity: 0.35, marginLeft: -8, marginTop: -8}} />
                <View id="overlay" onClick={this.closeModal} style={{position: "fixed", zIndex: 800,  width: "95%", height: "100%"}}>
                    <View style={{maxWidth: 500, margin: "auto", verticalAlign: "middle", padding: 20}}>
                        <View style={{background: "white", border: "1px solid gray", padding: 15, minHeight: 150, borderRadius: 10}}>
                            {this.props.children}
                            <View onClick={this.test}>Hello</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export const Modal = connect(mapStateToProps)(ModalContainer)

export default Modal