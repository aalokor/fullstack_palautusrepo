import type { DiaryEntries } from "../types";

const DiaryList = ({ diaries }: DiaryEntries) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          visibility: {diary.visibility} <br />
          weather: {diary.weather} <br />
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
