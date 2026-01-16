import patients from "../../data/patients";
import { v4 as uuid } from "uuid";

import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types";

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

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addEntry,
};
