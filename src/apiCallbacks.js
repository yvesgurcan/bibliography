import {store} from './mapStateToProps'

export const putReferencesInStore = (response) => {
    if (response) {
        if (response.references) {
            store.dispatch({type: "PUT_REMOTE_REFERENCES_IN_STORE", references: [...response.references]})
            store.dispatch({type: "PUT_REMOTE_REFERENCES_IN_LOCALSTORAGE", references: [...response.references]})    
            return true   
        }

    }

    throw new Error("No 'references' object was found in the response")
}

export const saveCredentialsLocally = (response, requestPayload) => {
    if (response) {
        if (response.authenticated) {
            store.dispatch({type: "PUT_CREDENTIALS_IN_APP", credentials: {...requestPayload.credentials}})
        }
    }
}