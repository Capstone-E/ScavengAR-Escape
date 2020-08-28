// ACTION TYPES
const SET_GAMESTATE = 'SET_GAMESTATE'
const SET_HOW_TO_PLAY = 'SET_HOW_TO_PLAY'

// ACTION CREATORS
const setGameStateAC = (gameState) => ({
  type: SET_GAMESTATE,
  gameState
})
const setHowToPlayAC = (howToPlay) => ({
  type: SET_HOW_TO_PLAY,
  howToPlay
})

// THUNK CREATORS
export const setGameState = (gameState) => (dispatch) => {
  try {
    dispatch(setGameStateAC(gameState))
  } catch (err) {
    console.error(err)
  }
}

export const setHowToPlay = (howToPlay) => (dispatch) => {
  try {
    dispatch(setHowToPlayAC(howToPlay))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialState = {
  gameState: false,
  howToPlay: false
}

// REDUCERS
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAMESTATE: {
      return {
        ...state,
        gameState: action.gameState
      }
    }
    case SET_HOW_TO_PLAY: {
      return {
        ...state,
        howToPlay: action.howToPlay
      }
    }
    default:
      return state
  }
}
