const CourseHeader = ({ course }) => (
    <div>
      <h2>{course.name}</h2>
    </div>
)

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({ parts }) => {
  const total = 
    parts.reduce( (s, p) => s + p.exercises, 0)
  return (
    <div>
      <p>
      <strong>Total of exercises {total}</strong>
      </p>
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <CourseHeader course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  )
}

export default Course