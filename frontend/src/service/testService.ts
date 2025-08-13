import api from "../api/api";
import type { Answer, Question, TestResult } from "../types";

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const { data } = await api.get<Question[]>("/test");

    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions. Please try again.");
  }
};

export const submitAnswers = async (answers: Answer[]): Promise<TestResult> => {
  try {
    const { data } = await api.post<TestResult>("/submit", { answers });
    return data;
  } catch (error) {
    console.error("Error submitting answers:", error);
    throw new Error("Failed to submit answers. Please try again.");
  }
};
