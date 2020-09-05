// ACTION TYPES
export const PORTAL_ONE = 'PORTAL_ONE'
export const PORTAL_TWO = 'PORTAL_TWO'
export const TRAIN_PORTAL = 'TRAIN_PORTAL'
export const FINAL_PORTAL = 'FINAL_PORTAL'
export const REMOVE_PORTALS = 'REMOVE_PORTALS'

// ACTION CREATORS
export const setPortal = (status, portalName) => ({
  type: portalName,
  status
})

// INITIAL STATE
const initialState = {
  portalOne: false,
  portalTwo: false,
  finalPortal: false,
  trainPortal: false,
  gameWon: false
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case PORTAL_ONE:
      return {...state, portalOne: action.status}
    case PORTAL_TWO:
      return {...state, portalTwo: action.status}
    case TRAIN_PORTAL:
      return {...state, trainPortal: action.status}
    case FINAL_PORTAL:
      return {...state, finalPortal: action.status}
    case REMOVE_PORTALS:
      return {...initialState, gameWon: action.status}
    default:
      return state
  }
}
