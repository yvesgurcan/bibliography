import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Modal from "./../Boilerplate/Modal"

class LoginModalContainer extends Component {
  render = () => {
    return (
      <Modal>
          LoginModal
      </Modal>
    )
  }
}
export const LoginModal = connect(mapStateToProps)(LoginModalContainer)

export default LoginModal