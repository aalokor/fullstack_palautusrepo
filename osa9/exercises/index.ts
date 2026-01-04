import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

import express from "express";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const bmiresult = calculateBmi(height, weight);
  res.json({
    weight: weight,
    height: height,
    bmi: bmiresult,
  });
});

app.post("/exercises", (_req, res) => {
  const { daily_exercises, target } = _req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({
      error: "parameters missing",
    });
  }

  const parsedTarget = Number(target);
  if (isNaN(parsedTarget)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  if (daily_exercises.some((d: unknown) => typeof d !== "number")) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(target, daily_exercises);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
