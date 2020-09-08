// action
const FOUND_OBJECT = 'FOUND_OBJECT'
export const RESET = 'RESET'

// action creator
export const foundObject = (objectStatus) => ({ // will return with value true if key is collected
  type: FOUND_OBJECT,
  objectStatus
})

export const resetObject = () => ({
  type: RESET
})


// reducer
const initalState = [] // each value will signify that a key was collected

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case FOUND_OBJECT:
      return [...state, action.objectStatus]
    case RESET:
      return []
    default:
      return state
  }
}

export default reducer
