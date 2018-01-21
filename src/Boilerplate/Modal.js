import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../Store/mapStateToProps"

import View from "./../Boilerplate/View"
import Close from "./../Boilerplate/Close"

class ModalContainer extends Component {
    closeModalFromBackground = (event) => {
        if (event.target.id === "overlay") {
            this.closeModal()         
        }
    }
    closeModal = () => {
        this.props.dispatch({type: "HIDE_MODAL"}) 
    }
    render = () => {
        return (
            <View hidden={this.props.id !== this.props.showModal}>
                <View id="overlay" onClick={this.closeModalFromBackground} style={{position: "fixed", zIndex: 800,  width: "100%", height: "100%", paddingTop: 20, marginLeft: -8, marginRight: -8, marginTop: -8, marginBottom: -8}}>
                    <View style={{maxWidth: 500, margin: "auto", verticalAlign: "middle"}}>
                        <View style={{background: "white", border: "1px solid gray", padding: 15, minHeight: 150, borderRadius: 10}}>
                            <Close onClick={this.closeModal} style={{float: "right"}} />
                            {this.props.children}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export const Modal = connect(mapStateToProps)(ModalContainer)

export default Modal