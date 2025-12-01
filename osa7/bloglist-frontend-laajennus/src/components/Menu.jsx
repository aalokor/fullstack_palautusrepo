import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} logged in
      <button className="button" type="button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Menu
