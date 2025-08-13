import api from "../api/api";
import type {
  CreateQuestionRequest,
  PaginatedResponse,
  Question,
  UpdateQuestionRequest,
} from "../types";

export const getQuestions = async (
  page: number = 1,
  size: number = 10
): Promise<PaginatedResponse<Question>> => {
  try {
    const response = await api.get<PaginatedResponse<Question>>(
      `/admin/questions?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions. Please try again.");
  }
};

export const getQuestion = async (id: string): Promise<Question> => {
  try {
    const response = await api.get<Question>(`/admin/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw new Error("Failed to fetch question. Please try again.");
  }
};

export const createQuestion = async (
  data: CreateQuestionRequest
): Promise<Question> => {
  try {
    const response = await api.post<Question>("/admin/questions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw new Error("Failed to create question. Please try again.");
  }
};

export const updateQuestion = async (
  id: string,
  data: UpdateQuestionRequest
): Promise<Question> => {
  try {
    const response = await api.put<Question>(`/admin/questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw new Error("Failed to update question. Please try again.");
  }
};

export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    await api.delete(`/admin/questions/${id}`);
  } catch (error) {
    console.error("Error deleting question:", error);
    throw new Error("Failed to delete question. Please try again.");
  }
};
