import { Award, CheckCircle, RotateCcw, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTestStore } from "../store/testStore";

const ResultPage = () => {
  const navigate = useNavigate();
  const { testResult, resetTest } = useTestStore();

  const handleRetakeTest = () => {
    resetTest();
    navigate("/");
  };

  if (!testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No test results available</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 80) return <Award className="w-8 h-8 text-green-600" />;
    if (percentage >= 60)
      return <CheckCircle className="w-8 h-8 text-yellow-600" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  const getBandScore = (percentage: number): string => {
    if (percentage >= 90) return "9.0";
    if (percentage >= 80) return "8.0";
    if (percentage >= 70) return "7.0";
    if (percentage >= 60) return "6.0";
    if (percentage >= 50) return "5.0";
    if (percentage >= 40) return "4.0";
    return "3.0";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Test Completed!
            </h1>
            <p className="text-gray-600">
              Here are your IELTS mock test results
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              {getScoreIcon(testResult.percentage)}
              <h2
                className={`text-4xl font-bold mt-4 ${getScoreColor(
                  testResult.percentage
                )}`}
              >
                {testResult.percentage}%
              </h2>
              <p className="text-gray-600 mt-2">Overall Score</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-800">
                  {testResult.correctCount}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Correct Answers
                </div>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-800">
                  {testResult.total - testResult.correctCount}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Incorrect Answers
                </div>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">
                  {getBandScore(testResult.percentage)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  IELTS Band Score
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  testResult.percentage >= 80
                    ? "bg-green-100 text-green-800"
                    : testResult.percentage >= 60
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {testResult.percentage >= 80 && "Excellent performance!"}
                {testResult.percentage >= 60 &&
                  testResult.percentage < 80 &&
                  "Good job! Keep practicing."}
                {testResult.percentage < 60 && "Keep studying and try again."}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Your Score</span>
                <span>
                  {testResult.correctCount}/{testResult.total}
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    testResult.percentage >= 80
                      ? "bg-green-500"
                      : testResult.percentage >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${testResult.percentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleRetakeTest}
              className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-medium text-lg shadow-lg hover:shadow-xl"
            >
              <RotateCcw size={24} />
              Retake Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
