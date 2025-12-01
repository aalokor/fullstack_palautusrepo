import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

const { createBlog, likeBlog, setBlogs, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = ({ blogObject, user }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)

    const createdBlog = {
      ...newBlog,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    }
    dispatch(createBlog(createdBlog))
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    const likedBlog = await blogService.update(blog.id, updatedBlog)
    const blogWithUser = { ...likedBlog, user: blog.user }
    dispatch(likeBlog(blogWithUser))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
