import { useTestStore } from "../store/testStore";
import type { Question as QuestionType } from "../types";

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
}

const Question: React.FC<QuestionProps> = ({ question, questionNumber }) => {
  const { getAnswerForQuestion, setAnswer } = useTestStore();
  const selectedOption = getAnswerForQuestion(question._id);

  const handleOptionChange = (optionIndex: number) => {
    setAnswer(question._id, optionIndex);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg sm:p-8 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Question {questionNumber}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">{question.text}</p>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-blue-50 ${
              selectedOption === index
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <input
              type="radio"
              name={`question-${question._id}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionChange(index)}
              className="w-5 h-5 text-blue-600 mr-4"
            />
            <span className="text-gray-700 text-base">
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
