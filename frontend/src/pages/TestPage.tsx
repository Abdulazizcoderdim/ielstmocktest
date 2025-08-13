import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import Question from "../components/Question";
import Timer from "../components/Timer";
import { fetchQuestions, submitAnswers } from "../service/testService";
import { useTestStore } from "../store/testStore";

const TestPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    answers,
    currentQuestionIndex,
    isLoading,
    error,
    isSubmitting,
    setQuestions,
    setCurrentQuestion,
    setLoading,
    setError,
    setSubmitting,
    setTestResult,
  } = useTestStore();

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const questionsData = await fetchQuestions();

      setQuestions(questionsData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load questions"
      );
    } finally {
      setLoading(false);
    }
  }, [setQuestions, setLoading, setError]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      setError(null);

      const result = await submitAnswers(answers);
      setTestResult(result);
      navigate("/result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit answers");
    } finally {
      setSubmitting(false);
    }
  }, [answers, setSubmitting, setError, setTestResult, navigate]);

  const handleTimeUp = useCallback(() => {
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [handleSubmit, isSubmitting]);

  const currentQuestion = questions[currentQuestionIndex];
  const canGoNext = currentQuestionIndex < questions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log("questttt", questions);

  if (error && questions.length === 0) {
    return <ErrorMessage message={error} onRetry={loadQuestions} />;
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No questions available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              IELTS Mock Test
            </h1>
            <p className="text-gray-600 mt-1">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <Timer onTimeUp={handleTimeUp} />
        </div>

        <div className="bg-white rounded-full p-1 mb-8 shadow-sm">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <Question
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
        />

        {error && questions.length > 0 && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-between max-sm:flex-col gap-5 sm:items-center mt-8 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentQuestion(currentQuestionIndex - 1)}
              disabled={!canGoPrevious}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                canGoPrevious
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            {!isLastQuestion && (
              <button
                onClick={() => setCurrentQuestion(currentQuestionIndex + 1)}
                disabled={!canGoNext}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  canGoNext
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || answers.length === 0}
            className={`flex w-fit items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
              isSubmitting || answers.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Send size={20} />
            )}
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Progress Summary
            </h3>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => {
                const hasAnswer = answers.some(
                  (answer) => answer.questionId === questions[index]._id
                );
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                      isCurrent
                        ? "bg-blue-600 text-white ring-2 ring-blue-300"
                        : hasAnswer
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Answered: {answers.length} / {questions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
