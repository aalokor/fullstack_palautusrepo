import { useQuery } from '@apollo/client/react'
import { USER_INFO, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const userInfo = useQuery(USER_INFO)
  const favoriteGenre = userInfo.data?.me?.favoriteGenre || null

  const result = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  })

  if (!props.show) {
    return null
  }

  if (result.loading || !result.data) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
