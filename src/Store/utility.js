export const ReferenceNotFound = () => {
    return {
        status: "error",
        message: "The reference could not be found."
    }
}

export const findReference = (url, array) => {
    let refIndex = null
    let reference = [...array.filter((ref, index) => {
        if (ref.url === url) {
            refIndex = index
            return true
        }
        return false
    })]

    if (reference.length > 0) {
        reference = reference[0]
    }

    return {reference: reference, index: refIndex}
}