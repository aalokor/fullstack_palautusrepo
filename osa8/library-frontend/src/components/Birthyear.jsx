import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Birthyear = (props) => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')

  const [changeBirthyear] = useMutation(EDIT_AUTHOR, {
    onError: (error) => props.setError(error.message),

    update: (cache, { data }) => {
      const editedAuthor = data.editAuthor

      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((author) =>
            author.id === editedAuthor.id ? editedAuthor : author
          ),
        }
      })
    },
  })

  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, setBornTo: Number(born) } })

    setBorn('')
    setName('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Birthyear
