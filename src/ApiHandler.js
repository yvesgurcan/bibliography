import {store} from "./mapStateToProps"

const ApiHandler = (request, payload) => {
    console.log(
        "ApiHandler",
        {
            request: request,
            payload: payload,
        }
    )
}

export default ApiHandler