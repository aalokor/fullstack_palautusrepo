import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

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
      <h2>{patient.name}</h2>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
    </div>
  );
};

export default PatientPage;
