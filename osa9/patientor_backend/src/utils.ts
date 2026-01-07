import { z } from "zod";
import { NewPatient, Gender } from "./types";

const genderEnum = z.enum(Object.values(Gender));

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Incorrect or missing date",
  }),
  ssn: z.string(),
  gender: genderEnum,
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewEntrySchema.parse(object);
};
