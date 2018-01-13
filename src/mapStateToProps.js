import {createStore} from 'redux'
import Reducers from './Reducers'

export const store = createStore(
  Reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const lowerCase = (string) => {
    if (string) {
        return String(string).toLowerCase()
    }
    return string
}

const removeDangerousCharacters = (string) => {
    if (string) {
        return String(string).replace(/[ '"]/g, "")
    }
    return string
}

const mapStateToProps = (state, ownProps) => {

    return {
        ...state,
        ...ownProps,
        matchReferenceId: (hashtag, doNotSave) => {
            if (hashtag && hashtag !== "") {
                if (!doNotSave) store.dispatch({type: "SET_HASHTAG", hashtag: hashtag})
                if (state.references) {
                    let matchId = null
                    state.references.filter(reference => {
                        let id = lowerCase(removeDangerousCharacters(reference.name))
                        if (id.indexOf(hashtag) > -1) {
                            matchId = id
                            return true
                        }
                        return false
                    })
                    return matchId
                }
            }
            return null
        },
        lowerCase: string => lowerCase(string),
        removeDangerousCharacters: string => removeDangerousCharacters(string),
        variousAuthorsString: "various authors",
        collectionString: "collection",
    }

}

export default mapStateToProps