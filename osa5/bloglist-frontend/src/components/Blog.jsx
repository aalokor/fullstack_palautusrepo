import { useState } from 'react'

const Blog = ({ blog, likeBlog, user, removeBlog }) => {
  const [full, setFull] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleFull = () => {
    setFull(!full)
  }

  if (!full) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button className="button" onClick={toggleFull}>view</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button className="button" onClick={toggleFull}>hide</button>
      </div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button className="button" onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>{blog.author}</div>
      {blog.user.username === user.username && (
        <button className="button-remove" onClick={() => removeBlog(blog)}>remove</button>
      )}
    </div>
  )
}

export default Blog
