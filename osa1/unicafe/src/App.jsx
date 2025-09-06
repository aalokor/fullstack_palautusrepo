import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (1*props.good + -1*props.bad)/total
  const positive = props.good/(props.good + props.neutral + props.bad)

  return (
    <table>
      <tbody>
        <StatisticLine value={props.good} text="good" />
        <StatisticLine value={props.neutral} text="neutral" />
        <StatisticLine value={props.bad} text="bad" />
        <StatisticLine value={total} text="all" />
        <StatisticLine value={average} text="average" />
        <StatisticLine value={positive} text="positive" />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <div>
        <Header header="give feedback" />
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <Header header="statistics" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    )
  } else {
    return (
    <div>
      <Header header="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header header="statistics" />
      <p>No feedback given</p>
    </div>
    )
  }
}

export default App
