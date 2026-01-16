import { ReactNode, useState } from "react";
import "./PatientPage.css";
import { Button } from "@mui/material";

interface Props {
  buttonLabel: string;
  children: ReactNode;
}

const Togglable = ({ buttonLabel, children }: Props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained" color="primary">
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="new_entry">
        {children}
        <Button
          onClick={toggleVisibility}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
