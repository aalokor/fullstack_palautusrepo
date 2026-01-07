interface TotalProps {
  totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps) => {
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default Total;
