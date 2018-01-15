import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Button from "./../Boilerplate/Button"
import {ModalTitle} from "./../Boilerplate/Headings"
import Modal from "./../Boilerplate/Modal"
import View from "./../Boilerplate/View"

class ConfirmRefreshModalContainer extends Component {

    confirm = () => {
        this.props.dispatch({type: "GET_REFERENCES_REMOTELY_ONLY"})
        this.props.dispatch({type: "HIDE_MODAL"})
    }

    cancel = () => {
        this.props.dispatch({type: "HIDE_MODAL"})
    }

  render = () => {
    return (
      <Modal id="confirmRefresh">
          <ModalTitle>Your changes will be lost</ModalTitle>
          <View style={{marginBottom: 10}}>
            Are you sure you want to refresh the list of references? This will fetch references as they were last time you synced them. Unsaved changes stored in your browser's cache will be lost.
          </View>
          <Button onClick={this.confirm}>Yep. I know what I'm doing</Button>
          <Button onClick={this.cancel}>I changed my mind</Button>
      </Modal>
    )
  }
}
export const ConfirmRefreshModal = connect(mapStateToProps)(ConfirmRefreshModalContainer)

export default ConfirmRefreshModal