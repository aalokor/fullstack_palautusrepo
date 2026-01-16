import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import WorkIcon from "@mui/icons-material/Work";
import HospitalIcon from "@mui/icons-material/LocalHospital";
import CheckIcon from "@mui/icons-material/Healing";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./PatientPage.css";
import { HealthCheckRating, EntryFormValues, Patient } from "../../types";
import Togglable from "./Togglable";
import AddEntryForm from "../AddEntryForm";
import axios from "axios";
import Alert from "@mui/material/Alert";

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  const colorMap = ["green", "yellow", "orange", "red"];

  return <FavoriteIcon sx={{ color: colorMap[rating] }} />;
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(undefined);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((data) => setPatient(data));
    }
  }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) {
      setError("No patient id");
      return;
    }
    try {
      const entry = await patientService.createEntry(id, values);
      console.log(entry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return (
      <div>
        <h2>Patient loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
      {error && <Alert severity="error">{error}</Alert>}
      <p></p>
      <Togglable buttonLabel="create new Entry">
        <AddEntryForm onSubmit={submitNewEntry} />
      </Togglable>{" "}
      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries</p>
      ) : (
        patient.entries.map((entry) => {
          switch (entry.type) {
            case "Hospital":
              return (
                <div key={entry.id} className="entry">
                  {entry.date} <HospitalIcon /> <br />
                  <em>{entry.description}</em> <br />
                  Discharge: {entry.discharge.date} - {entry.discharge.criteria}
                  <br />
                  Diagnosed by {entry.specialist} <br />
                </div>
              );

            case "HealthCheck":
              return (
                <div key={entry.id} className="entry">
                  {entry.date} <CheckIcon /> <br />
                  <em>{entry.description}</em> <br />
                  <HealthRatingIcon rating={entry.healthCheckRating} /> <br />
                  Diagnosed by {entry.specialist} <br />
                </div>
              );

            case "OccupationalHealthcare":
              return (
                <div key={entry.id} className="entry">
                  {entry.date} <WorkIcon /> {entry.employerName} <br />
                  <em>{entry.description}</em> <br />
                  {entry.sickLeave && (
                    <p>
                      Sick Leave: {entry.sickLeave.startDate} -{" "}
                      {entry.sickLeave.endDate}
                    </p>
                  )}
                  Diagnosed by {entry.specialist} <br />
                </div>
              );

            default:
              return null;
          }
        })
      )}
    </div>
  );
};

export default PatientPage;
