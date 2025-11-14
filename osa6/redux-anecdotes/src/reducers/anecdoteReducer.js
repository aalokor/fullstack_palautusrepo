import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
        state.push(action.payload)
      },
    voteAnecdote(state, action) {
      const changedAnecdote = {
        ...action.payload,
        votes: action.payload.votes + 1
      }
      return state.map(anecdote => (anecdote.id !== action.payload.id ? anecdote : changedAnecdote))     
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote(anecdote)
    dispatch(voteAnecdote(anecdote))
  }
}

export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
