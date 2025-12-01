import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    deleteUser(state) {
      return null
    },
  },
})

const { setUser, deleteUser } = userSlice.actions

export const initializeUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    dispatch(deleteUser())
  }
}

export default userSlice.reducer
