import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../Store/mapStateToProps"

import Button from "./../Boilerplate/Button"
import {TextInput, Checkbox} from "./../Boilerplate/Input"
import {ModalTitle} from "./../Boilerplate/Headings"
import Modal from "./../Boilerplate/Modal"
import View from "./../Boilerplate/View"

class LoginModalContainer extends Component {

  dontSignIn = () => {
    this.props.dispatch({type: "DONT_WISH_TO_SIGN_IN"})
  }

  updateSignIn = (input) => {
    this.props.dispatch({type: "UPDATE_SIGN_IN", name: input.name, value: input.value})
  
  }

  signIn = () => {
    this.props.dispatch({type: "SIGN_IN"})
  }

  toggleSaveCredentials = () => {
    this.props.dispatch({type: "TOGGLE_SAVE_CREDENTIALS"})
  }

  render = () => {
    let signIn = {...this.props.signIn}
    return (
      <Modal id="login">
          <ModalTitle>Sign in to sync your updates</ModalTitle>
          <View style={{marginBottom: 10}}>
            Don't have a password? If you wish to continue without logging in, your changes will not be synchronized. You can edit references locally but your updates will be lost if you clear your browser's cache or refresh the references.
          </View>
          <View style={{paddingRight: 12}}>
            <TextInput name="user" placeholder="Enter your username" onChange={this.updateSignIn} value={signIn.user} style={{width: "100%"}} />
            <TextInput name="password" placeholder="Enter your password" type="password" value={signIn.password} onChange={this.updateSignIn} style={{width: "100%"}} />
          </View>
          <View>
            <Checkbox onClick={this.toggleSaveCredentials} checked={this.props.saveCredentials}>Save my password on this device</Checkbox>
          </View>
          <Button onClick={this.signIn}>Sign in</Button>
          <Button onClick={this.dontSignIn}>I don't wish to sign in</Button>
      </Modal>
    )
  }
}
export const LoginModal = connect(mapStateToProps)(LoginModalContainer)

export default LoginModal