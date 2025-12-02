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
    addComment(state, action) {
      const { blogId, comment } = action.payload
      return state.map((blog) =>
        blog.id !== blogId
          ? blog
          : { ...blog, comments: [...(blog.comments || []), comment] }
      )
    },
  },
})

const { createBlog, likeBlog, setBlogs, deleteBlog, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    const blogsWithComments = await Promise.all(
      blogs.map(async (blog) => {
        const comments = await blogService.getComments(blog.id)
        return { ...blog, comments }
      })
    )

    dispatch(setBlogs(blogsWithComments))
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

export const createComment = (blogId, text) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(blogId, { text })
    dispatch(addComment({ blogId, comment: newComment }))
  }
}

export default blogSlice.reducer
