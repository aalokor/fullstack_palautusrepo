import axios from "axios";
import type { DiaryEntry } from "../types";

const baseUrl = "/api/diaries";

interface ErrorResponse {
  error: string;
}

export const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createEntry = (object: DiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const message = error.response?.data?.error;
        throw new Error(message);
      }
      throw new Error("Unknown error");
    });
};
