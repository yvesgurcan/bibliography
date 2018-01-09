const initState = {
    search: {
        index: 0,
        history: [""],
    }
}

function Reducer (state = initState, action) {

    let newState = {...state}

    if (action.type === "INIT") {
        return {...initState}
    }

    let newHistory = []
    let newIndex = []
    let filteredReferences = []
    let newReferences = []
    if (state.references) {
        newReferences = [...state.references]        
    }
    let editReference = []
    let refIndex = null
    let newFeedback = state.feedback

    switch (action.type) {

        case "MOCK_DATA":
            newState = {
                ...state,
                allowEdit: true,
                references: [
                    {
                        name: "Eloquent Javascript",
                        subtitle: "test",
                        author: "Marijn Haverbeke",
                        type: "book",
                        description: "This is a book about JavaScript, programming, and the wonders of the digital. ",
                        url: "http://eloquentjavascript.net/",
                        added: "2018/01/04",
                        tags: ["JavaScript", "Front-End"],

                    },
                    {
                        name: "Doom",
                        variousAuthors: true,
                        description: "This is a collection of resources about the creation of the videogame Doom",
                        collection: [
                            {
                                name: "Doom Source Code",
                                url: "https://github.com/id-Software/DOOM",
                                type: "repository",
                                author: "id Software"
                            },
                            {
                                name: "TCRF Page for Doom",
                                url: "https://tcrf.net/Doom_(PC,_1993)",
                                type: "wiki",
                            },
                            {
                                name: "TCRF Page for Doom II",
                                url: "https://tcrf.net/Doom_II:_Hell_on_Earth_(PC)",
                                type: "wiki",
                            },
                        ],
                        added: "2018/01/08",
                        tags: ["Doom", "Videogames", "id Software"],

                    },
                ],
            }
            newState.filteredReferences = [...newState.references]
            break

        // api
            
        case "REQUEST_AUTHORIZATION":
            newState = {
                ...state,
                credentials: {...action.credentials},
            }
            // TODO API
            break
        
        case "AUTHORIZED":
            newState = {
                ...state,
                allowEdit: true,
            }
            break
        
        case "SAVE_CHANGES":
            // find the reference in the list
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = "The item could not be found."
            }

            // modify the reference
            editReference[0][action.name] = action.value

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                feedback: newFeedback,
                references: [...newReferences]
            }
            break

        case "CLEANUP":

            // find the reference in the list
            debugger
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            // silently fail
            if (refIndex === null) {
                return newState
            }

            // necessary adjustments
            if (editReference[0].variousAuthors) {
                editReference[0].author = undefined
            }

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                references: [...newReferences]
            }

            break

        // search
            
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
    
        // SEARCH FEATURE DEACTIVATED FOR NOW
        return references
    
    searchString = searchString.toLowerCase()

    let negative = false

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

        unmatchedClusters.map((andCluster, index) => {
            matchResults = CheckCluster(orClusters[index], andCluster, reference.name, globalMatches.match)
            globalMatches = {
                match: matchResults.match,
                matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
            }
            negative = matchResults.negative
            return null
        })
        // if (negative) return false
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        unmatchedClusters.map((andCluster, index) => {
            matchResults = CheckCluster(orClusters[index], andCluster, reference.description, globalMatches.match)
            globalMatches = {
                match: matchResults.match,
                matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
            }
            negative = matchResults.negative
            return null
        })
        // console.log(negative, matchResults)
        // if (negative) return false
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        unmatchedClusters.map((andCluster, index) => {
            matchResults = CheckCluster(orClusters[index], andCluster, reference.author, globalMatches.match)
            globalMatches = {
                match: matchResults.match,
                matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
            }
            negative = matchResults.negative
            return null
        })
        // if (negative) return false
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        unmatchedClusters.map((andCluster, index) => {
            reference.tags.map(tag => {
                matchResults = CheckCluster(orClusters[index], andCluster, tag, globalMatches.match)
                globalMatches = {
                    match: matchResults.match,
                    matchedClusters: [...globalMatches.matchedClusters, ...matchResults.matchedClusters]
                }
                negative = matchResults.negative
                return null
            })
            return null
        })
        // if (negative) return false
        unmatchedClusters = RemoveMatchedClusters([...unmatchedClusters], globalMatches.matchedClusters)

        return globalMatches.match >= andMatchesRequired
    })

    return results
}

function CheckCluster(allClusters, cluster, text, match) {

    console.log("cluster",cluster)

    let negativeCluster = []
    let positiveCluster = []
    let skipNextFragment = false
    console.log(cluster)
    cluster.map((fragment, index) => {
        if (fragment === "not") {
            skipNextFragment = true
        }
        else {
            if (!skipNextFragment) {
                skipNextFragment = false
                positiveCluster.push(fragment)    
            }
        }
        return null
    })

    allClusters.map((fragment, index) => {
        if (fragment === "not") {
            if (index < cluster.length && cluster[Number(index+1)] !== undefined) {
                negativeCluster.push(cluster[Number(index+1)])
                skipNextFragment = true    
            }
        }
        return null
    })

    console.log(
        {
            negative: negativeCluster,
            positive: positiveCluster,
        }
    )

    let matchedClusters = []
    if (positiveCluster.length > 0) {
        let regEx = new RegExp(positiveCluster.join("|"), "g")
        let comparison = text.toLowerCase().match(regEx)
        if (comparison !== null) {
            matchedClusters.push(comparison[0])
            match++
        }
    }

    let negative = false
    if (negativeCluster.length > 0) {
        let regExNegative = new RegExp(negativeCluster.join("|"), "g")
        let matchedClusters2 = []
        let comparison2 = text.toLowerCase().match(regExNegative)
        if (comparison2 !== null) {
            matchedClusters2.push(comparison2[0])
            negative = true
        }
    }

    return {match: match, matchedClusters: matchedClusters, negative: negative}
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
