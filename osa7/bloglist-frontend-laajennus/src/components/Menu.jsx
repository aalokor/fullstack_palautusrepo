import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

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
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ backgroundColor: '#53102fff' }}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" style={padding}>
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users" style={padding}>
            users
          </Nav.Link>
        </Nav>
        <Nav>
          {user && (
            <>
              <Navbar.Text className="me-3">{user.name} logged in</Navbar.Text>

              <Button variant="primary" onClick={handleLogout} className="ms-2">
                logout
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
