// action
const FOUND_KEY_ONE = 'FOUND_KEY_ONE'
const FOUND_KEY_TWO = 'FOUND_KEY_TWO'
export const RESET = 'RESET'

// action creator
// will return with value true if key is collected
export const foundKeyOne = (objectStatus) => ({ 
  type: FOUND_KEY_ONE,
  objectStatus
})

// will return with value true if key is collected
export const foundKeyTwo = (objectStatus) => ({ 
    type: FOUND_KEY_TWO,
    objectStatus
})

export const resetObject = () => ({
  type: RESET
})


// reducer
// each value will signify that a key was collected
const initalState = {
    keyOne: false,
    keyTwo: false
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case FOUND_KEY_ONE:
      return {...state, keyOne: action.objectStatus}
    case FOUND_KEY_TWO:
    return {...state, keyTwo: action.objectStatus}
    case RESET:
      return initalState
    default:
      return state
  }
}

export default reducer
