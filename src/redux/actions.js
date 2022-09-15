export const actionTypes = {
    UPDATE_STORE_OBJ: "UPDATE_STORE_OBJ"
}

export const updateStoreData = (payload) => {
    return {
        type: actionTypes.UPDATE_STORE_OBJ,
        payload
    }
}