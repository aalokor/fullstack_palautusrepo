import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import CreateForm from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const createBlog = async event => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
        <p>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </p>
        <h2>create new</h2>
        <CreateForm
          createBlog={createBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
        />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
    </div>
  )
}

export default App