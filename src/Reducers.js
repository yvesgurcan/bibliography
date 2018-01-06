const initState = {
    search: {
        index: 0,
        history: [""],
    }
}

function Reducer (state = initState, action) {

    let newState = {...state}

    let newHistory = []
    let newIndex = []
    let filteredReferences = []

    switch (action.type) {

        case "INIT":
            newState = {...initState}
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
            newState.filteredReferences = [...newState.references]
            break

        case "UPDATE_SEARCH_STRING":
            newHistory = [...newState.search.history]
            newIndex = newState.search.index + 1
            newHistory.splice(newIndex, 0, action.string)
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    history: newHistory,
                    index: newIndex,
                }
            }
            filteredReferences = ExamineReferences(newState.search.history[newState.search.index], [...newState.references])
            newState = {
                ...newState,
                filteredReferences: filteredReferences,
            }
            break

        case "ADD_STRING_TO_SEARCH":
            if (newState.search.history[newState.search.index] === " " + action.string) {
                return newState
            }
            newHistory = [...newState.search.history]
            newIndex = newState.search.index + 1
            newHistory.splice(newIndex, 0, newState.search.history[newState.search.index] + " " + action.string)
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    history: newHistory,
                    index: newIndex,
                }
            }
            filteredReferences = ExamineReferences(newState.search.history[newState.search.index], [...newState.references])
            newState = {
                ...newState,
                filteredReferences: filteredReferences,
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
            filteredReferences = ExamineReferences(newState.search.history[newState.search.index], [...newState.references])
            newState = {
                ...newState,
                filteredReferences: filteredReferences,
            }
            break

        case "NEXT_SEARCH_STRING":
            newHistory = [...newState.search.history]
            if (newState.search.index + 1 === newState.search.history.length) {
                if (newHistory[newState.search.index] !== "") {
                    newHistory = [...newState.search.history, ""]
                }
            }
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    history: newHistory,
                    index: Math.min(++newState.search.index, newHistory.length - 1),
                }
            }
            filteredReferences = ExamineReferences(newState.search.history[newState.search.index], [...newState.references])
            newState = {
                ...newState,
                filteredReferences: filteredReferences,
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
            filteredReferences = ExamineReferences(newState.search.history[newState.search.index], [...newState.references])
            newState = {
                ...newState,
                filteredReferences: filteredReferences,
            }
            break

        case "ADD_AND_TO_SEARCH_STRING":
            newHistory = [...newState.search.history, newState.search.history[newState.search.index] + " and "]
            newIndex = newState.search.index + 1
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    index: newIndex,
                    history: newHistory,
                }
            }
            filteredReferences = ExamineReferences(newState.search.history[newState.search.index], [...newState.references])
            newState = {
                ...newState,
                filteredReferences: filteredReferences,
            }
            break
        
        case "ADD_NOT_TO_SEARCH_STRING":
            newHistory = [...newState.search.history, newState.search.history[newState.search.index] + " not "]
            newIndex = newState.search.index + 1
            newState = {
                ...state,
                search: {
                    ...newState.search,
                    index: newIndex,
                    history: newHistory,
                }
            }
            filteredReferences = ExamineReferences(newState.search.history[newState.search.index], [...newState.references])
            newState = {
                ...newState,
                filteredReferences: filteredReferences,
            }
            break

        default:
            break
    }

    return newState
}

function ExamineReferences(searchString, references) {
    
    searchString = searchString.toLowerCase()

    // let wordClusters = searchString.split(/ +/)
    // wordClusters = wordClusters.map(cluster => cluster.trim())


    let andClusters = []
    let andMatchesRequired = 0
    if (searchString.split) {
        andClusters = searchString.split("and")
        andClusters = andClusters.map(cluster => cluster.trim())
        andClusters = andClusters.filter(cluster => cluster !== "")
        andMatchesRequired = andClusters.length
    }

    let orClusters = andClusters.map(cluster => cluster.split(/ +/))

    let unmatchedClusters = [...orClusters]

    let results = references.filter((reference) => {

        let globalMatches = {match: 0, matchedClusters: []}
        let matchResults = null

        unmatchedClusters.map(andCluster => {
            matchResults = CheckCluster(andCluster, reference.name, globalMatches.match)
            globalMatches = {
                match: matchResults.match,
                matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
            }
            return null
        })
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        unmatchedClusters.map(andCluster => {
            matchResults = CheckCluster(andCluster, reference.description, globalMatches.match)
            globalMatches = {
                match: matchResults.match,
                matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
            }
            return null
        })
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        unmatchedClusters.map(andCluster => {
            matchResults = CheckCluster(andCluster, reference.author, globalMatches.match)
            globalMatches = {
                match: matchResults.match,
                matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
            }
            return null
        })
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        unmatchedClusters.map(andCluster => {
            reference.tags.map(tag => {
                matchResults = CheckCluster(andCluster, tag, globalMatches.match)
                globalMatches = {
                    match: matchResults.match,
                    matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
                }
                return null
            })
            return null
        })
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        return globalMatches.match >= andMatchesRequired
    })

    return results
}

function CheckCluster(cluster, text, match) {
    let regEx = new RegExp(cluster.join("|"), "g")
    let matchedClusters = []
    let comparison = text.toLowerCase().match(regEx)
    if (comparison !== null) {
        matchedClusters.push(comparison[0])
        match++
    }

    return {match: match, matchedClusters: matchedClusters}
}

function RemoveMatchedClusters(clusters, matchedClusters) {

    if (matchedClusters.length === 0) return [...clusters]

    let unmatchedClusters = [...clusters].map(andCluster => andCluster.filter(orCluster => {
        if (orCluster.indexOf(matchedClusters) === -1) {
            return true
        }
        return false
    })).filter(andCluster => andCluster.length > 0)

    return [...unmatchedClusters]
}

export default Reducer