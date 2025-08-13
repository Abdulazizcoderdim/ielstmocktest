import { Plus, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createQuestion, updateQuestion } from "../service/adminService";
import { useAdminStore } from "../store/adminStore";
import type { QuestionFormData } from "../types";

export const QuestionForm: React.FC = () => {
  const {
    editingQuestion,
    showForm,
    isSubmitting,
    setSubmitting,
    setError,
    resetForm,
    addQuestion,
    updateQuestionInList,
  } = useAdminStore();

  const [formData, setFormData] = useState<QuestionFormData>({
    text: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (editingQuestion) {
      setFormData({
        text: editingQuestion.text,
        options: [...editingQuestion.options],
        correctAnswerIndex: editingQuestion.correctAnswerIndex,
      });
    } else {
      setFormData({
        text: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
      });
    }
    setValidationErrors({});
  }, [editingQuestion, showForm]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.text.trim()) {
      errors.text = "Question text is required";
    }

    formData.options.forEach((option, index) => {
      if (!option.trim()) {
        errors[`option${index}`] = `Option ${String.fromCharCode(
          65 + index
        )} is required`;
      }
    });

    if (formData.correctAnswerIndex < 0 || formData.correctAnswerIndex > 3) {
      errors.correctAnswerIndex = "Please select a valid correct answer";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editingQuestion) {
        const updatedQuestion = await updateQuestion(
          editingQuestion._id,
          formData
        );
        updateQuestionInList(updatedQuestion);

        toast.success("Question updated successfully");
      } else {
        const newQuestion = await createQuestion(formData);
        addQuestion(newQuestion);
        toast.success("Question created successfully");
      }

      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleClose = () => {
    resetForm();
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingQuestion ? "Edit Question" : "Create New Question"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Text *
            </label>
            <textarea
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                validationErrors.text ? "border-red-500" : "border-gray-300"
              }`}
              rows={3}
              placeholder="Enter the question text..."
            />
            {validationErrors.text && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.text}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Options *
            </label>
            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      validationErrors[`option${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswerIndex === index}
                    onChange={() =>
                      setFormData({ ...formData, correctAnswerIndex: index })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                </div>
              ))}
            </div>
            {Object.keys(validationErrors).some((key) =>
              key.startsWith("option")
            ) && (
              <p className="text-red-500 text-sm mt-1">
                All options are required
              </p>
            )}
            {validationErrors.correctAnswerIndex && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.correctAnswerIndex}
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Select the radio button next to the correct answer
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : editingQuestion ? (
                <Save size={16} />
              ) : (
                <Plus size={16} />
              )}
              {isSubmitting
                ? "Saving..."
                : editingQuestion
                ? "Update Question"
                : "Create Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
