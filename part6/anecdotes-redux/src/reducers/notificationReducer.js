const initial = null

const reducer = (state = initial, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return initial
    default:
      return state
  }
}


export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type:'SET_NOTIFICATION',
      data: message
    })

    setTimeout(() => dispatch({ type: 'RESET_NOTIFICATION'}), time * 1000)
  }
}


export default reducer