import {store} from './Store/mapStateToProps'

const throwError = function throwError(message, wrapDispatch) {
    if (process.env.NODE_ENV === 'production') {
        if (wrapDispatch) {
            setTimeout(() => {
                store.dispatch({type: "ERROR", message})
                console.error(`Error: ${message}`)        
            })
        }
        else {
            store.dispatch({type: "ERROR", message})
            console.error(`Error: ${message}`)    
        }
    }
    else {
        // falls back to the create-react-app error display
        throw new Error(message)
    }
}

export default throwError