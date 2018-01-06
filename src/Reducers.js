const initState = {
    search: {
        index: 0,
        history: [""],
    }
}

function Reducer (state = initState, action) {

    let newState = {...state}

    switch (action.type) {

        case "INIT":
            newState = {...initState }
            break

        case "MOCK_DATA":
            newState = {
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
            let newHistory1 = [...newState.search.history]
            let newIndex1 = newState.search.index + 1
            newHistory1.splice(newIndex1, 0, action.string)
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    history: newHistory1,
                    index: newIndex1,
                }
            }
            break

        case "ADD_STRING_TO_SEARCH":
            if (newState.search.history[newState.search.index] === " " + action.string) {
                return newState
            }
            let newHistory2 = [...newState.search.history]
            let newIndex2 = newState.search.index + 1
            newHistory2.splice(newIndex2, 0, newState.search.history[newState.search.index] + " " + action.string)
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    history: newHistory2,
                    index: newIndex2,
                }
            }
            break

        case "PREVIOUS_SEARCH_STRING":
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    index: Math.max(--newState.search.index, 0),
                }
            }
            break

        case "NEXT_SEARCH_STRING":
            let newHistory3 = [...newState.search.history]
            if (newState.search.index + 1 === newState.search.history.length) {
                if (newHistory3[newState.search.index] !== "") {
                    newHistory3 = [...newState.search.history, ""]
                }
            }
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    history: newHistory3,
                    index: Math.min(++newState.search.index, newHistory3.length - 1),
                }
            }
            break

        case "CLEAR_SEARCH_STRING":
            if (newState.search.history[newState.search.index] === "") {
                return newState
            }
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    index: ++newState.search.index,
                    history: [...newState.search.history, ""],
                }
            }
            break

        case "ADD_AND_TO_SEARCH_STRING":
        let newHistory4 = [...newState.search.history, newState.search.history[newState.search.index] + " and "]
        let newIndex4 = newState.search.index + 1
        newState = {
                ...state,
                search: {
                    ...newState.search,
                    index: newIndex4,
                    history: newHistory4
                }
            }
            break

        default:
            break
    }

    return newState
}

export default Reducer