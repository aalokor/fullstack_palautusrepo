import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import { Table, Button } from 'react-bootstrap'

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
      dispatch(setNotification('Could not update likes', 'danger', 5))
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
      dispatch(setNotification('Could not remove blog', 'danger', 5))
    }
  }

  const handleComment = async ({ text }) => {
    try {
      dispatch(createComment(id, text))
    } catch {
      dispatch(setNotification('Could not add comment', 'danger', 5))
    }
  }

  if (blogs.length === 0) return <div>loading...</div>

  const blog = blogs.find((b) => b.id === id)

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <a href={blog.url}>{blog.url}</a>
            </td>
          </tr>
          <tr>
            <td>
              {blog.likes} likes
              <Button
                variant="primary"
                onClick={() => handleLike(blog)}
                className="ms-2"
              >
                like
              </Button>
            </td>
          </tr>
          <tr>
            <td>{blog.user.name}</td>
          </tr>
        </tbody>
      </Table>
      {blog.user?.username === user.username && (
        <Button
          variant="primary"
          onClick={() => handleDelete(blog)}
          className="ms-2"
        >
          remove
        </Button>
      )}
      <CommentForm handleComment={handleComment} />
      <Table striped>
        <tbody>
          {blog.comments?.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.text}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blog
