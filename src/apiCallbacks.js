import {store} from './mapStateToProps'

export const putReferencesInStore = (response) => {
  if (response) {
    const {references} = response
    if (references) {
      store.dispatch({type: "PUT_REMOTE_REFERENCES_IN_STORE", references})
      store.dispatch({type: "PUT_REMOTE_REFERENCES_IN_LOCALSTORAGE", references})    
      return true   
    }

  }

  throw new Error("No 'references' object was found in the response")
}

export const saveCredentialsLocally = (response, requestPayload) => {
  if (response) {
    const {isAuthenticated} = response
    const {credentials} = requestPayload.credentials
    if (isAuthenticated) {
      store.dispatch({
        type: "UPDATE_FEEDBACK",
        feedback: {
          status: "success",
          message:  `You were successfully authenticated. Welcome back, ${credentials.user}!`,
        },
      })
      store.dispatch({type: "PUT_CREDENTIALS_IN_APP", isAuthenticated, credentials})
    }
    else {
      store.dispatch({
        type: "UPDATE_FEEDBACK",
        feedback: {
          status: "warning",
          message: "Incorrect login. Your username or your password is invalid.",
        },
      })
      store.dispatch({type: "PUT_CREDENTIALS_IN_APP", isAuthenticated})
    }
  }

}