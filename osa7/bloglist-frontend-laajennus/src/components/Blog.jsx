import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const handleLike = async (blogObject) => {
    try {
      dispatch(updateBlog(blogObject))
    } catch {
      dispatch(setNotification('Could not update likes', 'error', 5))
    }
  }

  const handleDelete = async (blogObject) => {
    const ok = window.confirm(
      `Remove blog "${blogObject.title}" by ${blogObject.author}?`
    )
    if (!ok) return

    try {
      dispatch(removeBlog(blogObject.id))
      dispatch(
        setNotification(`Blog "${blogObject.title}" removed`, 'success', 5)
      )
      navigate('/')
    } catch {
      dispatch(setNotification('Could not remove blog', 'error', 5))
    }
  }

  if (blogs.length === 0) return <div>loading...</div>

  const blog = blogs.find((b) => b.id === id)

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button className="button" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user?.username === user.username && (
        <button className="button-remove" onClick={() => handleDelete(blog)}>
          remove
        </button>
      )}
    </div>
  )
}

export default Blog
