import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <br />
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const filteredAnecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  )

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`You voted "${anecdote.content}"`))
  }

  return (
    <div>
      {[...filteredAnecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteForm
