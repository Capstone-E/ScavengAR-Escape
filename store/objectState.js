// action
const FOUND_OBJECT = 'FOUND_OBJECT'
const FOUND_KEY_ONE = 'FOUND_KEY_ONE'
const FOUND_KEY_TWO = 'FOUND_KEY_TWO'
export const RESET = 'RESET'

// action creator
// will return with value true if key is collected
export const foundObjectOne = (objectStatus) => ({ 
  type: FOUND_KEY_ONE,
  objectStatus
})

// will return with value true if key is collected
export const foundObjectTwo = (objectStatus) => ({ 
    type: FOUND_KEY_TWO,
    objectStatus
})

export const resetObject = () => ({
  type: RESET
})


// reducer
// const initalState = [] // each value will signify that a key was collected

// each value will signify that a key was collected
const initalState = {
    keyOne: false,
    keyTwo: false
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case FOUND_OBJECT_ONE:
      return {...state, keyOne: action.objectStatus}
    case FOUND_OBJECT_TWO:
    return {...state, keyTwo: action.objectStatus}
    case RESET: // will change later if this works
      return []
    default:
      return state
  }
}

export default reducer
