import type { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          {part.name} {part.exerciseCount} <br />
          <i>{part.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          {part.name} {part.exerciseCount} <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {part.name} {part.exerciseCount} <br />
          <i>{part.description}</i> <br />
          submit to {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          {part.name} {part.exerciseCount} <br />
          <i>{part.description}</i> <br />
          required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
      break;
  }
};

export default Part;
