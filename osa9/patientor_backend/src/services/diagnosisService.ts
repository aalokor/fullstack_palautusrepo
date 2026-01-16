import data from "../../data/diagnoses";

import { Diagnosis } from "../types";

const diagnosis: Diagnosis[] = data;

const getEntries = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getEntries,
};
