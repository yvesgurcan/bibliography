import {createStore} from 'redux'
import Reducers from './Reducers'

export const store = createStore(
  Reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
// const dispatch = store.dispatch

const mapStateToProps = (state, ownProps) => {

    return {
        ...state,
        ...ownProps,
    }

}

export default mapStateToProps