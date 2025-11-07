import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [user, setUser] = useState(null)
  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      createFormRef.current.toggleVisibility()
      setBlogs(blogs.concat({
        ...createdBlog,
        user: {
          id: user.id,
          username: user.username,
          name: user.name
        }
      }))
      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    } catch {
      setMessage('a new blog couldn\'t be added')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const newBlog = {
        user: blogObject.user,
        likes: blogObject.likes + 1,
        author: blogObject.author,
        title: blogObject.title,
        url: blogObject.url
      }
      const updatedBlog = await blogService.update(blogObject.id, newBlog)
      setBlogs(blogs.map(blog =>
        blog.id !== blogObject.id ? blog : updatedBlog
      ))
    } catch {
      setMessage('Could not update likes')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    }
  }

  const removeBlog = async (blogObject) => {
    const ok = window.confirm(`Remove blog "${blogObject.title}" by ${blogObject.author}?`)
    if (!ok) return

    try {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setMessage(`Blog "${blogObject.title}" removed`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    } catch {
      setMessage('Could not remove blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <p>
        {user.name} logged in
        <button className="button" type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable buttonLabel='create new blog'ref={createFormRef}>
        <CreateForm createBlog={addBlog}/>
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user}/>
        )}
    </div>
  )
}

export default App
