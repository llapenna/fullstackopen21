const initial = null

// action types
const SET_NOTIFICATION = 'notification/SET'
const CLEAR_NOTIFICATION = 'notification/CLEAR'

// reducer
const reducer = (state = initial, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case CLEAR_NOTIFICATION:
      return null
    default:
      return state
  }
}

let timeoutId

// action creators

export const setNotification = (message, time) => {
  console.log(message)
  return async dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      data: message
    })

    if (timeoutId)
      clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIFICATION,
      })
    }, time * 1000)
  }
}

export default reducer