import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
      likes: 0,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            className="w-50"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            className="w-50"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            className="w-50"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: '#973b5eff',
            borderColor: '#000000ff',
          }}
        >
          create
        </Button>
      </Form>
    </div>
  )
}

export default CreateForm
