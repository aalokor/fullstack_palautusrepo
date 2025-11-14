import { createSlice } from '@reduxjs/toolkit'

const showNotification = (message) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

const initialState = ''

const notificationSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export { showNotification }
export default notificationSlice.reducer