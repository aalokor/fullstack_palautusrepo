import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: 'success',
}

const notificationSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    removeNotification() {
      return { message: '', type: 'success' }
    },
  },
})

const setNotification = (message, type, seconds) => {
  return (dispatch) => {
    dispatch(addNotification({ message, type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 1000 * seconds)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export { setNotification }
export default notificationSlice.reducer
