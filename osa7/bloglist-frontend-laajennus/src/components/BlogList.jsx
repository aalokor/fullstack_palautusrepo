import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <Table striped>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
