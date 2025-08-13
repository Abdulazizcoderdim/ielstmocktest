export interface Question {
  _id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Answer {
  questionId: string;
  selectedOption: number;
}

export interface TestResult {
  total: number;
  correctCount: number;
  percentage: number;
}

export interface TestStore {
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  timeRemaining: number;
  isLoading: boolean;
  error: string | null;
  testResult: TestResult | null;
  isSubmitting: boolean;

  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, selectedOption: number) => void;
  setCurrentQuestion: (index: number) => void;
  setTimeRemaining: (time: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTestResult: (result: TestResult | null) => void;
  setSubmitting: (submitting: boolean) => void;
  resetTest: () => void;
  getAnswerForQuestion: (questionId: string) => number | null;
}

export interface CreateQuestionRequest {
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface UpdateQuestionRequest {
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface QuestionFormData {
  text: string;
  options: string[];
  correctAnswerIndex: number;
}
