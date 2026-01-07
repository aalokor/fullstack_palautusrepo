import data from "../../data/diagnoses";

import { Diagnose } from "../types";

const diagnoses: Diagnose[] = data;

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getEntries,
};
