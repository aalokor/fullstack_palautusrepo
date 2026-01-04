interface exercisesValues {
  target: number;
  hours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsExercises = (args: string[]): exercisesValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target value is not a number");

  const hours = args.slice(3).map((arg) => {
    const num = Number(arg);
    if (isNaN(num)) throw new Error(`Provided value is not a number: ${arg}`);
    return num;
  });

  if (hours.length === 0) throw new Error("No hours provided");

  return { target, hours };
};
export const calculateExercises = (target: number, hours: number[]): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const average = hours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "target met, great!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "train more, target was far";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, hours } = parseArgumentsExercises(process.argv);
    console.log(calculateExercises(target, hours));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
