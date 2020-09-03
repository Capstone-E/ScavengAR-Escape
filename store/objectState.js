
// action 
const FOUND_OBJECT = 'FOUND_OBJECT';

// action creator 
const foundObject = (objectStatus) => ({
    type: FOUND_OBJECT, objectStatus
})

// thunk creator 
export const foundObjectThunk = (objectStatus) => (dispatch) => {
    dispatch(foundObject(objectStatus)) // will return with value true if key is collected
}

// reducer 
const initalState =  [] // each value will signify that a key was collected

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case FOUND_OBJECT:
            return [...state, action.objectStatus]
        default:
            return state
    }
}

export default reducer;