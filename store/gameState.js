// ACTION TYPES
const SET_GAMESTATE = 'SET_GAMESTATE'

// ACTION CREATORS
const setGameStateAC = (gameState) => ({
  type: SET_GAMESTATE,
  gameState
})

// THUNK CREATORS
export const setGameState = (gameState) => (dispatch) => {
  try {
    dispatch(setGameStateAC(gameState))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialState = {
  gameState: false,
  foundNote: false,
  foundKey: false
}

// REDUCERS
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAMESTATE:
      return {
        ...state,
        gameState: !action.gameState
      }
  }
}
