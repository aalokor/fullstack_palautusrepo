import { SyntheticEvent, useState } from "react";
import {
  HealthCheckRating,
  EntryType,
  EntryFormValues,
  Diagnosis,
} from "../../types";
import { Button, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  diagnosis: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, diagnosis }: Props) => {
  const [type, setType] = useState("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [codes, setCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();

    switch (type) {
      case "HealthCheck":
        onSubmit({
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating: healthRating,
          diagnosisCodes: codes.length ? codes : undefined,
        });
        break;

      case "Hospital":
        onSubmit({
          type: "Hospital",
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria,
          },
          diagnosisCodes: codes.length ? codes : undefined,
        });
        break;

      case "OccupationalHealthcare":
        const sickLeave =
          startDate && endDate
            ? {
                startDate,
                endDate,
              }
            : undefined;

        onSubmit({
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          employerName,
          sickLeave,
          diagnosisCodes: codes.length ? codes : undefined,
        });
        break;
    }
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthRating(HealthCheckRating.Healthy);
    setCodes([]);
    setDischargeDate("");
    setCriteria("");
    setEmployerName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={addEntry}>
      <h2>New Entry</h2>
      <TextField
        select
        label="Entry type"
        variant="standard"
        value={type}
        onChange={(e) => setType(e.target.value as EntryType)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="HealthCheck">Health check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational healthcare
        </MenuItem>
      </TextField>

      <TextField
        label="Description"
        variant="standard"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <p></p>
      <TextField
        label="Date"
        type="date"
        variant="standard"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Specialist"
        variant="standard"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        fullWidth
      />

      <p></p>
      <TextField
        select
        label="Diagnosis codes"
        value={codes}
        onChange={(e) => setCodes(e.target.value as unknown as string[])}
        SelectProps={{ multiple: true }}
        fullWidth
      >
        {diagnosis.map((d) => (
          <MenuItem key={d.code} value={d.code}>
            {d.code} - {d.name}
          </MenuItem>
        ))}
      </TextField>

      {type === "HealthCheck" && (
        <TextField
          select
          label="Healthcheck rating"
          variant="standard"
          value={healthRating}
          onChange={(e) =>
            setHealthRating(Number(e.target.value) as HealthCheckRating)
          }
          fullWidth
          sx={{ mt: 2 }}
        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>Low risk</MenuItem>
          <MenuItem value={2}>High risk</MenuItem>
          <MenuItem value={3}>Critical risk</MenuItem>
        </TextField>
      )}
      {type === "Hospital" && (
        <div>
          <p></p>
          <TextField
            label="Discharge date"
            type="date"
            variant="standard"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Discharge criteria"
            variant="standard"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            fullWidth
          />
        </div>
      )}
      {type === "OccupationalHealthcare" && (
        <div>
          <TextField
            label="Employer name"
            variant="standard"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            fullWidth
          />
          <p></p>
          <TextField
            label="Sick leave start date"
            type="date"
            variant="standard"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <p></p>
          <TextField
            label="Sick leave end date"
            type="date"
            variant="standard"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}

      <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
        Add
      </Button>
    </form>
  );
};

export default AddEntryForm;
