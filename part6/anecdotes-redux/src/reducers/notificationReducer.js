const initial = null

const reducer = (state = initial, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET':
      return initial
    default:
      return state
  }
}

export const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: message
  }
}

export const hideNotification = () => {
  return {
    type: 'RESET',
  }
}

export default reducer