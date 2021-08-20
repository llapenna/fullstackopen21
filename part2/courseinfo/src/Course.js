const CourseName = ({title}) => <h2>{title}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>
const Content = ({parts}) => (
    <>
      { parts.map( p => (
        <Part 
          key={p.id}
          part={p}
        />
      )) }
    </>
)

const Total = ({parts}) => {

  const exercises = 
    parts.reduce((acc, curr) => acc + curr.exercises, 0) // 0 is the initial value for the accumulator

  return <p>Number of exercises {exercises}</p>
}

const Course = ({course}) => (
    <>
        <CourseName title={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course