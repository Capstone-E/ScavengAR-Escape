
// action 
const FOUND_OBJECT = 'FOUND_OBJECT';

// action creator 
const foundObject = (objectStatus) => ({
    type: FOUND_OBJECT, objectStatus
})

// thunk creator 
export const foundObjectThunk = (objectStatus) => (dispatch) => {
    dispatch(foundObject(objectStatus)) // ex. key
}

// reducer 
const initalState =  []

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case FOUND_OBJECT:
            return [...state, action.objectStatus]
        default:
            return state
    }
}

export default reducer;