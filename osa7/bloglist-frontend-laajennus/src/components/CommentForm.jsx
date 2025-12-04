import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ handleComment }) => {
  const [text, setText] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    handleComment({ text })
    setText('')
  }

  return (
    <div>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control
            type="text"
            value={text}
            onChange={({ target }) => setText(target.value)}
            className="w-50"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </Form>
    </div>
  )
}

export default CommentForm
