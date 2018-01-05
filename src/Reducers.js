function Reducer (state, action) {

    let NewState = {...state}
    switch (action.type) {

        case "MOCK_DATA":
            NewState = {
                ...state,
                references: [
                    {
                        name: "Eloquent Javascript",
                        author: "Marijn Haverbeke",
                        type: "book",
                        description: "This is a book about JavaScript, programming, and the wonders of the digital. ",
                        url: "http://eloquentjavascript.net/",
                        published: "",
                        added: "2018/01/04",
                        tags: ["JavaScript", "Front-End"],

                    }
                ],
            }
            break

        case "UPDATE_SEARCH_STRING":
            NewState = {
                ...state,
                search: action.string
            }
            break

        case "ADD_STRING_TO_SEARCH":
            NewState = {
                ...state,
                search: state.search ? state.search + " " + action.string : action.string
            }
            break

        case "CLEAR_SEARCH_STRING":
            NewState = {
                ...state,
                search: ""
            }
            break

        default:
            break
    }

    return NewState
}

export default Reducer