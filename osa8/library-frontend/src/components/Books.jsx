import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const { data: allBooksData, loading: loadingAll } = useQuery(ALL_BOOKS)

  const { data: filteredbooksData, loading: loadingFiltered } = useQuery(
    ALL_BOOKS,
    {
      variables: { genre },
      skip: !genre && genre !== null,
    }
  )

  if (!props.show) return null
  if (loadingAll || loadingFiltered) return <div>loading...</div>

  const allBooks = allBooksData.allBooks
  const allGenres = [...new Set(allBooks.flatMap((b) => b.genres))]

  const books = genre ? filteredbooksData?.allBooks : allBooks

  return (
    <div>
      <h2>books</h2>
      in genre <b>{genre || 'all genres'}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
