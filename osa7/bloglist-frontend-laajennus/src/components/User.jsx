import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)

  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>

      <Table striped>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User
