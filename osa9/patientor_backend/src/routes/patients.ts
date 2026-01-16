import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { NewPatientSchema, NewEntrySchema } from "../utils";

import { z } from "zod";
import { NewPatient, Patient, NewEntry } from "../types";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewPatientSchema.parse(req.body); //req.body added
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response) => {
    const patientId = req.params.id;

    if (!patientId) {
      return res.status(400).send("Missing patient id");
    }

    const addedEntry = patientsService.addEntry(req.body, patientId);
    return res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
