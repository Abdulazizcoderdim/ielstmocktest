import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import React from "react";
import { useAdminStore } from "../store/adminStore";
import type { Question } from "../types";

interface QuestionTableProps {
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
  onPageChange: (page: number) => void;
}

export const QuestionTable: React.FC<QuestionTableProps> = ({
  onEdit,
  onDelete,
  onPageChange,
}) => {
  const {
    questions,
    currentPage,
    totalPages,
    totalQuestions,
    pageSize,
    isLoading,
  } = useAdminStore();

  const truncateText = (text: string, maxLength: number = 50): string => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-4">No questions found</p>
          <p className="text-sm text-gray-500">
            Create your first question to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Question
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Options
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Correct Answer
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {questions.map((question) => (
              <tr key={question._id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="max-w-xs">
                    <p className="text-gray-900 font-medium">
                      {truncateText(question.text, 60)}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    {question.options.map((option, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <span className="font-medium">
                          {String.fromCharCode(65 + index)}.
                        </span>{" "}
                        {truncateText(option, 30)}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {String.fromCharCode(65 + question.correctAnswerIndex)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {truncateText(
                        question.options[question.correctAnswerIndex],
                        25
                      )}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(question)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit question"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(question)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete question"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {questions.map((question) => (
          <div key={question._id} className="p-4">
            <div className="mb-3">
              <p className="font-medium text-gray-900 mb-2">{question.text}</p>
              <div className="space-y-1">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`text-sm p-2 rounded ${
                      index === question.correctAnswerIndex
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}.
                    </span>{" "}
                    {option}
                    {index === question.correctAnswerIndex && (
                      <span className="ml-2 text-xs font-medium">
                        (Correct)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onEdit(question)}
                className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => onDelete(question)}
                className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalQuestions)} of{" "}
            {totalQuestions} questions
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
