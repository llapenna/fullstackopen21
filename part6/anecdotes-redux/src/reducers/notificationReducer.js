const initial = {
  message: null,
  id: null
}

const reducer = (state = initial, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.id !== null )
        clearTimeout(state.id)
      return { message: action.data.message }
    case 'SET_NOTIFICATION_ID':
      return { ...state, id: action.data.id}  
    case 'RESET_NOTIFICATION':
      return initial
    default:
      return state
  }
}


export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message }
    })

    const id = setTimeout(() => dispatch({ type: 'RESET_NOTIFICATION'}), time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION_ID',
      data: { id }
    })
  }
}


export default reducer