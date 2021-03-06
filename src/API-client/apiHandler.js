import throwError from './../throwError'
import {store} from './../Store/mapStateToProps'
const apiUrl = "http://localhost:5000/"

const apiHandler = (
    method = "get",
    request = null,
    payload = null,
    callback = null,
) => {
    console.log(
        "apiHandler - request",
        {
            method,
            request,
            payload,
        }
    )

    if (request) {
        fetch(apiUrl + request /* '+ request' is for debug only */)
            // custom error handling
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(`Request returned with status code ${response.status}`)
                }

                const contentType = response.headers.get("content-type")
                if (contentType.indexOf("application/json") === -1) {
                    throw new Error(`Invalid content-type '${contentType}'. Response body must be a JSON object`)
                }

                return response.json()
            })
            .then(body => {

                console.log(
                    "apiHandler - response",
                    {
                        method,
                        request,
                        body,
                    }
                )

                if (callback) {
                    callback(body, payload)
                }
            }) 
            .catch(error => {
                debugger
                store.dispatch({
                    type: "API_ERROR",
                    message: error.message,
                })
            })

        return null
    }
    
    throwError("Please specify a request", true)
    
}

export default apiHandler