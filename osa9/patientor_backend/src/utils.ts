import { z } from "zod";
import { NewPatient, Gender } from "./types";

const genderEnum = z.enum(Object.values(Gender));
const EntrySchema = z.object({}); //change this later

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Incorrect or missing date",
  }),
  ssn: z.string(),
  gender: genderEnum,
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewEntrySchema.parse(object);
};
