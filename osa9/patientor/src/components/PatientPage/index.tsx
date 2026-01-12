import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((data) => setPatient(data));
    }
  }, [id]);

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
    </div>
  );
};

export default PatientPage;
