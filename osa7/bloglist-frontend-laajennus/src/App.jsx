import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const createFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, user])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
    }
  }, [dispatch])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(initializeUser(user))
    } catch {
      dispatch(setNotification('wrong username or password', 'danger', 5))
    }
  }

  const handleCreate = async (blogObject) => {
    try {
      createFormRef.current.toggleVisibility()
      dispatch(appendBlog({ blogObject, user }))
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          'success',
          5
        )
      )
    } catch {
      dispatch(setNotification("A new blog couldn't be added", 'danger', 5))
    }
  }

  if (user === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <Router>
      <div className="container">
        <Menu />
        <h2>blog app</h2>
        <Notification />
        <Togglable buttonLabel="create new" ref={createFormRef}>
          <CreateForm createBlog={handleCreate} />
        </Togglable>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
