const initState = {
    search: {
        index: 0,
        history: [""],
    },
}

const ReferenceNotFound = () => {
    return {
        status: "error",
        message: "The reference could not be found."
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
    let backupReference = []
    let refIndex = null
    let newFeedback = {...state.feedback}
    let referenceMatch = []

    switch (action.type) {

        // init

        case "GET_REFERENCES_REMOTELY_ONLY":
            // falls through
        case "GET_REFERENCES":
            newState = {
                ...state,
                allowEdit: true,
                references: [
                    {
                        sort: 1,
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
                        sort: 2,
                        name: "Test",
                        subtitle: "test",
                        author: "Marijn Haverbeke",
                        type: "book",
                        description: "This is a book about JavaScript, programming, and the wonders of the digital. ",
                        anchor: "ajax",
                        added: "2018/01/04",
                        tags: ["JavaScript", "Front-End"],

                    },
                    {
                        sort: 3,
                        subtitle: "test",
                        author: "Marijn Haverbeke",
                        type: "book",
                        description: "This is a book about JavaScript, programming, and the wonders of the digital. ",
                        url: "http://google.com",
                        added: "2018/01/04",
                        tags: ["JavaScript", "Front-End"],
                    },
                    {
                        sort: 4,
                        url: "https://github.com/id-Software/DOOM",
                        name: "Doom'\"",
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

        case "CURRENT_WIDTH":
            newState = {
                ...state,
                width: action.width
            }
            break

        case "SET_HASHTAG":
            newState = {
                ...state,
                hashtag: action.hashtag,        
            }
            break

        // user messages

        case "CLEAR_FEEDBACK":
            newState = {
                ...state,
                feedback: undefined,        
            }
            break

        // connectivity

        case "UPDATE_CONNECTION_STATUS":

            let offlineWarningDisplayed = state.offlineWarningDisplayed
            if (!action.isOnline && !state.offlineWarningDisplayed) {
                offlineWarningDisplayed = true
                newFeedback = {
                    message: "You are not connected.\nAny modification you make will only be available on this device until you are online again."
                }
            }
            else if (!action.isOnline) {
                newFeedback = {
                    message: "You are not connected anymore."
                }
            }
            else if (state.isOnline !== undefined) {
                newFeedback = {
                    message: "You are back online. Reconnecting to the server..."
                    // TODO get a fresh set of data *OR* send updates to the server
                }
            }
            newState = {
                ...state,
                feedback: {...newFeedback},
                isOnline: action.isOnline,
                offlineWarningDisplayed: offlineWarningDisplayed,
            }
            break

        case "DO_NOT_FOLLOW_LINK_MESSAGE":
            let offlineLinkWarningDisplayed = state.offlineLinkWarningDisplayed
            if (!offlineLinkWarningDisplayed) {
                offlineLinkWarningDisplayed = true
                newFeedback = {
                    message: "You are not connected. All external links have been deactivated until your device is online again."
                }
            }
            newState = {
                ...state,
                feedback: {...newFeedback},
                offlineLinkWarningDisplayed: offlineLinkWarningDisplayed,
            }
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
        
        // add a new reference

        case "ADD_MODE_ON":
            newState = {
                ...state,
                addMode: true,
            }
            break
        
         case "ADD_MODE_OFF":
            newState = {
                ...state,
                addMode: undefined,
                newReferenceUrl: undefined,
                newReferenceName: undefined,
            }
            break

        case "EDIT_NEW_REFERENCE_URL":
            newState = {
                ...state,
                newReferenceUrl: action.url
            }
            break
        
        case "EDIT_NEW_REFERENCE_NAME":
            newState = {
                ...state,
                newReferenceName: action.name
            }
            break

        case "CREATE_REFERENCE":
            let addedRef =  {url: state.newReferenceUrl || "", name: state.newReferenceName || ""}

            if (addedRef.url === "") {
                newFeedback = {
                    status: "warning",
                    message: "Please enter a valid URL to create a new reference.",
                }
                newState = {
                    ...state,
                    feedback: {...newFeedback},
                }
            }
            else {
                referenceMatch = state.references.filter(ref => ref.url === addedRef.url)

                if (referenceMatch.length > 0) {
                    newFeedback = {
                        status: "warning",
                        message: "This URL is already in use for " + (referenceMatch[0].name ? " a reference named '" + referenceMatch[0].name + "'" : "an unnamed reference") + ". Please edit that reference or enter a different URL."
                    }
                    newState = {
                        ...state,
                        feedback: {...newFeedback},
                    }
                }
                else {
                    newFeedback = {
                        status: "success",
                        message: "New reference successfully created."
                    }
                    newState = {
                        ...state,
                        feedback: {...newFeedback},
                        references: [{...addedRef}, ...state.references],
                        filteredReferences: [{...addedRef}, ...state.filteredReferences],
                        addMode: false,
                        newReferenceUrl: undefined,
                        newReferenceName: undefined,
                    }   
                }

            }

            break

        // edit reference

        case "SAVE_URL_CHANGE":
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.oldUrl) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }

            // modify the reference
            let newUrl = action.newUrl
            if (newUrl.match(/(^http:\/\/|^https:\/\/)/) === null) {
                if (newUrl.length <= 6) {
                    newUrl = "http://"                    
                }
                else {
                    // TODO: check if newUrl contains fragments of the http(s):// string at the beginning and act accordingly (by replacing the malformed http prefix with a clean one)
                    newUrl = "http://"  + newUrl
                }
            }
            editReference[0].newUrl = newUrl

            newState = {
                ...state,
                feedback: {...newFeedback},
                references: [...newReferences]
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
                newFeedback = ReferenceNotFound()
            }

            // modify the reference
            editReference[0][action.name] = action.value

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                feedback: {...newFeedback},
                references: [...newReferences],
                filteredReferences: [...newReferences],
            }
            break

        case "ADD_TAG":
            // find the reference in the list
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }
            // create a new array
            if (!editReference[0].tags) {
                editReference[0].tags = [""]
            }
            // add an empty value at the end of the array
            else {
                editReference[0].tags = [...editReference[0].tags, ""]
            }

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                feedback: {...newFeedback},
                references: [...newReferences]
            }
            break

        case "REMOVE_TAG":
            // find the reference in the list
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }

            // modify the reference
            editReference[0].tags = [...editReference[0].tags]
            editReference[0].tags.pop()

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                feedback: {...newFeedback},
                references: [...newReferences]
            }
            break

        case "ADD_COLLECTION_ITEM":
            // find the reference in the list
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }

            let newItem = {name: "", url: "http://", type: "", author: ""}

            // create a new array and insert values from the reference as the first element
            if (!editReference[0].collection || editReference[0].collection.length === 0) {
                newItem = {
                    url: editReference[0].url,
                    name: editReference[0].name,
                    type: editReference[0].type,
                    author: editReference[0].author,
                }
                editReference[0].collection = [{...newItem}]
            }
            // add a new object at the end of the array
            else {
                editReference[0].collection = [...editReference[0].collection, {...newItem}]
            }



            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                feedback: {...newFeedback},
                references: [...newReferences]
            }
            break

        case "EDIT_COLLECTION_ITEM":
            // find the reference in the list
            editReference = [...newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })]

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }

            let value = action.value
            if (action.name === "url") {
                if (value.match(/(^http:\/\/|^https:\/\/)/) === null) {
                    if (value.length <= 6) {
                        value = "http://"                    
                    }
                    else {
                        value = "http://"  + value
                    }
                }
    
                if (action.itemIndex === 0) {
                    // TODO backup url in a way that is similar to the master url
                }    
            }

            editReference[0].collection[action.itemIndex][action.name] = value

            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                feedback: {...newFeedback},
                references: [...newReferences],
                filteredReferences: [...newReferences],
            }

            break

        case "REMOVE_COLLECTION_ITEM":
            // find the reference in the list
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }

            // move the data of the last collection item to the top of the reference
            if (editReference[0].collection.length === 1) {
                let valuesFromItem = {
                    url: editReference[0].collection[0].url,
                    name: editReference[0].collection[0].name,
                    type: editReference[0].collection[0].type,
                    author: editReference[0].collection[0].author,
                }
                editReference[0] = { ...valuesFromItem, ...editReference[0]}
            }
            // remove the last collection item
            editReference[0].collection.pop()

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                feedback: {...newFeedback},
                references: [...newReferences],
                filteredReferences: [...newReferences],
            }
            break

        case "SWAP_URLS":
            // find the reference in the list
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

            if (editReference[0].newUrl) {
                editReference[0].url = editReference[0].newUrl
                editReference[0].newUrl = undefined
            }

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                references: [...newReferences]
            }

            break

        case "SHOW_CASE_INSENSITIVE_WARNING":
            newState = {
                ...state,
                caseInsensitiveAnchors: "Please note that anchors are not case sensitive. All uppercase characters are replaced by their lowercase counterpart. Additionally, a small set of special characters are not allowed."
            }
            break

        case "CLEANUP":

            // find the reference in the list
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
            if (editReference[0].tags) {
                let newTags = [...editReference[0].tags.filter(tag => (tag !== ""))]
                editReference[0].tags = newTags
            }
            if (editReference[0].collection) {
                let newCollection = [...editReference[0].collection.filter(collection => collection.url !== "" && collection.name !== "")]
                editReference[0].collection = newCollection
            }

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                references: [...newReferences],
                caseInsensitiveAnchors: undefined,
            }

            break

        case "BACKUP_REFERENCE":
            let newBackup = [...state.referenceBackup || [], {...action.reference}]

            if (!action.reference.url || action.reference.url === "") {
                newFeedback = {
                    status: "error",
                    message: "This reference does not have a URL. This field is required! Please enter a URL.",
                }
            }

            newState = {
                ...state,
                referenceBackup: [...newBackup],
                feedback: {...newFeedback},
            }
            break

        case "REMOVE_BACKUP":

            newBackup = [...state.referenceBackup.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return false
                }
                return true
            })]
 
 
            if (refIndex === null) {
                 newFeedback = ReferenceNotFound()
            }

            newState = {
                ...state,
                referenceBackup: [...newBackup],
                feedback: {...newFeedback},
            }
            break

        case "CANCEL_EDIT":

            backupReference = [...state.referenceBackup.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })]

            newBackup = [...state.referenceBackup.filter((ref, index) => {
                if (ref.url === action.url) {
                    return false
                }
                return true
            })]

            if (backupReference.length === 0) {
                newFeedback = {
                    status: "error",
                    message: "The reference could not be restored. No backup found. Changes to the reference were applied.",
                }
                newState = {
                    ...state,
                    feedback: {...newFeedback}
                }
            }
            else if (backupReference.length > 1) {
                newFeedback = {
                    status: "error",
                    message: "More than one reference backup element was found. Changes to the reference were applied.",
                }
                newState = {
                    ...state,
                    feedback: {...newFeedback},
                }
            }
            else {

                newReferences = [...state.filteredReferences]
                newReferences.map((ref, index) => {
                    if (ref.url === action.url) {
                        refIndex = index
                        return true
                    }
                    return false
                })
                
                if (refIndex === null) {
                    newFeedback = ReferenceNotFound()
                }

                newReferences[refIndex] = {...backupReference[0]}

                newState = {
                    ...state,
                    references: [...newReferences],
                    filteredReferences: [...newReferences],
                    referenceBackup: [...newBackup],
                    feedback: {...newFeedback},
                }
            }
            break

        // sort

        case "SORT_MODE_ON":
            newState = {
                ...state,
                sortMode: true,
                sortIndex: action.referenceIndex,
            }
            break

        case "EVENT_LISTENER_ARGUMENTS":
            newState = {
                ...state,
                eventListenerArgs: {...action.arguments},
            }
            break
        
        case "SET_PLACEHOLDER_INDEX":
            newState = {
                ...state,
                placeholderIndex: action.placeholderIndex,
            }
            break

        case "RESORT_TARGET":

            newReferences = [...state.filteredReferences]

            let referenceToResort = {...newReferences[state.sortIndex]}

            let adjustedIndex = state.placeholderIndex
            if (state.sortIndex > state.placeholderIndex) {
                adjustedIndex = state.placeholderIndex + 1
            }

            let newNewReferences = [...newReferences.filter((ref, index) => index !== state.sortIndex)]

            newNewReferences.splice(adjustedIndex, 0, referenceToResort)

            newState = {
                ...state,
                filteredReferences: [...newNewReferences],
                placeholderIndex: undefined,
                sortMode: false,
                sortTarget: undefined,
                sortIndex: undefined,
            }
            break

        // delete

        case "DELETE_REFERENCE_STAGE_1":
            // find the reference in the list
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }

            editReference[0].deleted = true

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                references: [...newReferences],
                filteredReferences: [...newReferences],
                feedback: {...newFeedback},
            }
            break
        
        case "DELETE_REFERENCE_STAGE_2":
            // find the reference in the list
            newReferences = [...state.references.filter((ref, index) => {
                if (ref.url !== action.url) {
                    return true
                }
                return false
            })]

            newState = {
                ...state,
                references: [...newReferences],
                filteredReferences: [...newReferences],
                feedback: {...newFeedback},
            }
            break
        
        case "CANCEL_DELETION":
        // find the reference in the list
            editReference = newReferences.filter((ref, index) => {
                if (ref.url === action.url) {
                    refIndex = index
                    return true
                }
                return false
            })

            if (refIndex === null) {
                newFeedback = ReferenceNotFound()
            }

            editReference[0].deleted = undefined

            // put it back in the list
            newReferences[refIndex] = editReference[0]

            newState = {
                ...state,
                references: [...newReferences],
                filteredReferences: [...newReferences],
                feedback: {...newFeedback},
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
