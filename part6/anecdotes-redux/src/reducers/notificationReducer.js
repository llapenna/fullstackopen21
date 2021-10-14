const initial = null

const reducer = (state = initial, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    default:
      return state
  }
}

export const setNotification = message => {
  return {
    type: 'SET',
    data: message
  }
}

export const hideNotification = () => {
  return {
    type: 'SET',
    data: null
  }
}

export default reducer