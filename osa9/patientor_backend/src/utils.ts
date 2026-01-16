import { z } from "zod";
import { NewPatient, Gender, NewEntry } from "./types";

const genderEnum = z.enum(Object.values(Gender));

const HealthCheckRatingSchema = z.number().int().min(0).max(3);

const HealthCheckEntrySchema = z.object({
  id: z.string(),
  type: z.literal("HealthCheck"),
  description: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Incorrect or missing date",
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: HealthCheckRatingSchema,
});

const HospitalEntrySchema = z.object({
  id: z.string(),
  type: z.literal("Hospital"),
  description: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Incorrect or missing date",
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Incorrect or missing date",
    }),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = z.object({
  id: z.string(),
  type: z.literal("OccupationalHealthcare"),
  description: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Incorrect or missing date",
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Incorrect or missing date",
      }),
      endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Incorrect or missing date",
      }),
    })
    .optional(),
});

export const EntrySchema = z.union([
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({ id: true });
const NewHospitalEntrySchema = HospitalEntrySchema.omit({ id: true });
const NewOccupationalHealthcareEntrySchema =
  OccupationalHealthcareEntrySchema.omit({ id: true });

export const NewEntrySchema = z.union([
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Incorrect or missing date",
  }),
  ssn: z.string(),
  gender: genderEnum,
  occupation: z.string(),
  entries: z.array(EntrySchema).optional().default([]),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};
