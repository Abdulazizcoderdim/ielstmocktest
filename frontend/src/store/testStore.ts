import { create } from "zustand";
import type { TestStore } from "../types";

export const useTestStore = create<TestStore>((set, get) => ({
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  timeRemaining: 600, // 10 min
  isLoading: false,
  error: null,
  testResult: null,
  isSubmitting: false,

  setQuestions: (questions) => set({ questions }),

  setAnswer: (questionId, selectedOption) => {
    const currentAnswers = get().answers;
    const existingAnswerIndex = currentAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    let newAnswers;
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      newAnswers = [...currentAnswers];
      newAnswers[existingAnswerIndex] = { questionId, selectedOption };
    } else {
      // Add new answer
      newAnswers = [...currentAnswers, { questionId, selectedOption }];
    }

    set({ answers: newAnswers });
  },

  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setTestResult: (result) => set({ testResult: result }),
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),

  resetTest: () =>
    set({
      questions: [],
      answers: [],
      currentQuestionIndex: 0,
      timeRemaining: 600,
      isLoading: false,
      error: null,
      testResult: null,
      isSubmitting: false,
    }),

  getAnswerForQuestion: (questionId) => {
    const answer = get().answers.find((a) => a.questionId === questionId);
    return answer ? answer.selectedOption : null;
  },
}));
