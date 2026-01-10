import { useState, useEffect } from "react";
import type { DiaryEntry, NewEntry } from "./types";
import { getAllDiaryEntries, createEntry } from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import NewEntryForm from "./components/NewEntryForm";
import Error from "./components/Error";

const isError = (e: unknown): e is Error => {
  return e instanceof Error;
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const showMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const entryCreation = (newEntry: NewEntry) => {
    const entryToAdd: DiaryEntry = {
      id: String(diaries.length + 1),
      ...newEntry,
    };

    createEntry(entryToAdd)
      .then((data) => setDiaries(diaries.concat(data)))
      .catch((e: unknown) => {
        if (isError(e)) {
          showMessage(e.message);
        } else {
          showMessage("Unknown error");
        }
      });
  };

  return (
    <div>
      <NewEntryForm onCreate={entryCreation} />
      <Error errorMessage={errorMessage} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
