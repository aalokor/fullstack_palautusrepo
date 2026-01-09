import { useState, useEffect } from "react";
import type { DiaryEntry, NewEntry } from "./types";
import { getAllDiaryEntries, createEntry } from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import NewEntryForm from "./components/NewEntryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const entryCreation = (newEntry: NewEntry) => {
    const entryToAdd: DiaryEntry = {
      id: String(diaries.length + 1),
      date: newEntry.date,
      weather: newEntry.weather,
      visibility: newEntry.visibility,
      comment: newEntry.comment,
    };

    createEntry(entryToAdd).then((data) => {
      setDiaries(diaries.concat(data));
    });
  };

  return (
    <div>
      <NewEntryForm onCreate={entryCreation} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
