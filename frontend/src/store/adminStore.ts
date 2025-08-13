import { create } from "zustand";
import type { PaginatedResponse, Question } from "../types";

interface AdminStore {
  questions: Question[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalQuestions: number;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  editingQuestion: Question | null;
  showForm: boolean;

  setQuestions: (response: PaginatedResponse<Question>) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSubmitting: (submitting: boolean) => void;
  setEditingQuestion: (question: Question | null) => void;
  setShowForm: (show: boolean) => void;
  addQuestion: (question: Question) => void;
  updateQuestionInList: (question: Question) => void;
  removeQuestion: (id: string) => void;
  resetForm: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  questions: [],
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  totalQuestions: 0,
  isLoading: false,
  error: null,
  isSubmitting: false,
  editingQuestion: null,
  showForm: false,

  setQuestions: (response) =>
    set({
      questions: response.content,
      currentPage: response.page.number,
      totalPages: response.page.totalPages,
      totalQuestions: response.page.totalElements,
    }),

  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  setEditingQuestion: (question) => set({ editingQuestion: question }),
  setShowForm: (show) => set({ showForm: show }),

  addQuestion: (question) => {
    const { questions, totalQuestions } = get();
    set({
      questions: [question, ...questions],
      totalQuestions: totalQuestions + 1,
    });
  },

  updateQuestionInList: (updatedQuestion) => {
    const { questions } = get();
    set({
      questions: questions.map((q) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      ),
    });
  },

  removeQuestion: (id) => {
    const { questions, totalQuestions } = get();
    set({
      questions: questions.filter((q) => q._id !== id),
      totalQuestions: totalQuestions - 1,
    });
  },

  resetForm: () =>
    set({
      editingQuestion: null,
      showForm: false,
      error: null,
    }),
}));
