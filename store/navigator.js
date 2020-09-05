// ACTION TYPES
export const AR_NAVIGATOR = 'AR_NAVIGATOR'
export const HOW_TO_PLAY = 'HOW_TO_PLAY'
export const UNSET = 'UNSET'
export const YOU_WIN = 'YOU_WIN'

// ACTION CREATORS
const setNavigatorAC = (navigatorType) => ({
  type: navigatorType,
  navigatorType
})

// THUNK CREATORS
export const setNavigator = (navigatorType) => (dispatch) => {
  try {
    dispatch(setNavigatorAC(navigatorType))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialState = 'UNSET'

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case AR_NAVIGATOR:
      return AR_NAVIGATOR
    case UNSET:
      return UNSET
    case HOW_TO_PLAY:
      return HOW_TO_PLAY
    case YOU_WIN:
      return YOU_WIN
    default:
      return state
  }
}
