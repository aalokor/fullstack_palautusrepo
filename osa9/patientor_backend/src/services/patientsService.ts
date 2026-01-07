import patients from "../../data/patients";
import { v4 as uuid } from "uuid";

import { NonSensitivePatient, Patient, NewPatient } from "../types";

const getEntries = (): NonSensitivePatient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
};
