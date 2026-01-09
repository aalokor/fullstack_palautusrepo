export interface DiaryEntry {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export interface DiaryEntries {
  diaries: DiaryEntry[];
}

export type NewEntry = Omit<DiaryEntry, "id">;
