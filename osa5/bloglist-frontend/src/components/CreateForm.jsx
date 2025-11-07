import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title: <input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
      </div>
      <div>
        author: <input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        url: <input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
      </div>
      <div>
        <button className="button" type="submit">create</button>
      </div>
    </form>
  )
}

export default CreateForm
