import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Button from "./../Boilerplate/Button"
import {TextInput} from "./../Boilerplate/Input"
import {ModalTitle} from "./../Boilerplate/Headings"
import Modal from "./../Boilerplate/Modal"
import View from "./../Boilerplate/View"

class LoginModalContainer extends Component {

  updateSignIn = (input) => {
    this.props.dispatch({type: "UPDATE_SIGN_IN", name: input.name, value: input.value})
  }
  render = () => {
    let signIn = {...this.props.signIn}
    return (
      <Modal id="login">
          <ModalTitle>Sign in to sync your updates</ModalTitle>
          <View style={{paddingRight: 12}}>
            <TextInput name="user" placeholder="Enter your username" onChange={this.updateSignIn} value={signIn.user} style={{width: "100%"}} />
            <TextInput name="password" placeholder="Enter your password" type="password" value={signIn.password} onChange={this.updateSignIn} style={{width: "100%"}} />
          </View>
          <View style={{marginBottom: 10}}>
            If you wish to continue without logging in, your changes will not be synchronized. If you clear your browser's cache or refresh the references, your updates will be lost.
          </View>
          <Button>Sign In</Button>
          <Button onHover={this.showNoSignInInfo}>I Don't Wish to Sign In</Button>
      </Modal>
    )
  }
}
export const LoginModal = connect(mapStateToProps)(LoginModalContainer)

export default LoginModal