import throwError from './throwError'
import {store} from './mapStateToProps'
const apiUrl = "http://localhost:5000/references"

const apiHandler = (
    method = "get",
    request = null,
    payload = null,
    callback = null,
) => {
    console.log(
        "apiHandler",
        {
            method,
            request,
            payload,
        }
    )

    if (request) {
        fetch(apiUrl)
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
                if (callback) {
                    callback(body)
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