import { useState } from 'react'

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
      <form onSubmit={addComment}>
        <div>
          <input
            type="text"
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
