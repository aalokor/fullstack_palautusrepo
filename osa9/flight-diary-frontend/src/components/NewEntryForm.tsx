import { useState } from "react";
import type { NewEntry } from "../types";

interface Props {
  onCreate: (entry: NewEntry) => void;
}

const NewEntryForm = ({ onCreate }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("sunny");
  const [visibility, setVisibility] = useState("great");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      date,
      weather,
      visibility,
      comment: comment || undefined,
    };
    onCreate(newEntry);

    setDate("");
    setWeather("sunny");
    setVisibility("great");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        <div>
          <label>visibility</label>
          {["great", "good", "ok", "poor"].map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={(event) =>
                  setVisibility(event.target.value as NewEntry["visibility"])
                }
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          <label>weather</label>
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={(event) =>
                  setWeather(event.target.value as NewEntry["weather"])
                }
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <label>comment</label>
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
