export const setNotification = (dispatch, message, seconds) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: message })

  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, seconds * 1000)
}