import React, { useState } from 'react'


const Buttons = ({handleNext, handleVote}) => {
  return (
    <>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
    </>
  )
}

const Anecdote = ({text}) => <p>{text}</p>

const AnecdoteOfTheDay = ({anecdote, votes}) => (
  <>
    <h1>Anecdote of the day</h1>
    <Anecdote text={anecdote}/>
    <p>Has {votes} votes</p>
  </>
)

const MostVoted = ({anecdotes, points}) => {

  const maxValue = Math.max(...points)
  const maxIndex = points.indexOf(maxValue)

  return (
    <>
      <h1>Most Voted Anecdote</h1>
      <Anecdote text={anecdotes[maxIndex]} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = 
    useState(new Array(anecdotes.length).fill(0)) // this outputs a 7 length array filled with zeros


  const randomBetween = (min, max) => {
    const number = Math.random() * (max - min) + min;
    return Math.floor(number)
  }

  const handleNext = () => {
    setSelected(randomBetween(0, anecdotes.length))
  }

  const handleVote = () => {
    setPoints(votes => {
      const copy = [...votes]
      copy[selected] += 1

      return copy
    })
  }

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} votes={points[selected]} />
      <Buttons handleNext={handleNext} handleVote={handleVote}/>
      <MostVoted anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App