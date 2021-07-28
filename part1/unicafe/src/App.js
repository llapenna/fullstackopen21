import React, { useState } from 'react'

const Title = () => <h1>Give Feedback</h1>

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const Buttons = ({handleGood, handleNeutral, handleBad}) => {
  return (
    <>
      <Button handleClick={handleGood} text='Good' />
      <Button handleClick={handleNeutral} text='Neutral' />
      <Button handleClick={handleBad} text='Bad' />
    </>
  )
}

const Stat = ({text, amount}) => (
  <tr>
    <td>{text}</td>
    <td>{amount}</td>
  </tr>
)

const All = ({stats}) => <Stat text='All' amount={stats[0].amount + stats[1].amount + stats[2].amount}/>

const Average = ({stats}) => {
  // Good: 1; Neutral: 0; Bad: -1
  const score = stats[0].amount - stats[2].amount
  const total = stats[0].amount + stats[1].amount + stats[2].amount

  if (total === 0)
    return <Stat text='Average' amount={0}/>
  else
    return <Stat text='Average' amount={score/total}/>
}

const Positive = ({stats}) => {
  const total = stats[0].amount + stats[1].amount + stats[2].amount

  const percentage = (stats[0].amount / total) * 100

  if (total === 0)
    return <Stat text='Positive' amount={0}/>
  else
    return <Stat text='Positive' amount={`${percentage}% `}/>
}

const Statistics = ({stats}) => {
  return (
    <>
      <h1>Statistics</h1>

      { stats[0].amount + stats[1].amount + stats[2].amount > 0 
      ? // We have at least one review
      <table>
        <tbody>
          <Stat amount={stats[0].amount} text={stats[0].text} />
          <Stat amount={stats[1].amount} text={stats[1].text} />
          <Stat amount={stats[2].amount} text={stats[2].text} />

          <br />

          <All stats={stats}/>
          <Average stats={stats} />
          <Positive stats={stats}/>
        </tbody>
      </table>
      : 
      <p>No feedback given</p>
      }
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = [
    {
      text: 'Good',
      amount: good,
    },
    {
      text: 'Neutral',
      amount: neutral,
    },
    {
      text: 'Bad',
      amount: bad,
    },
  ]

  return (
    <div>
      <Title />
      <Buttons 
        handleGood={() => setGood(good + 1)}
        handleNeutral={() => setNeutral(neutral + 1)}
        handleBad={() => setBad(bad + 1)}
      />
      <Statistics stats={statistics}/>
    </div>
  )
}

export default App