import { createSlice } from '@reduxjs/toolkit'

const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 1000 * seconds)
  }
}

const initialState = ''

const notificationSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions
export { setNotification }
export default notificationSlice.reducer