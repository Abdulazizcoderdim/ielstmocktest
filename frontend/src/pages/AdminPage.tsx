import { BookOpen, Plus, RefreshCw } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { ErrorMessage } from "../components/ErrorMessage";
import { QuestionForm } from "../components/QuestionForm";
import { QuestionTable } from "../components/QuestionTable";
import { deleteQuestion, getQuestions } from "../service/adminService";
import { useAdminStore } from "../store/adminStore";
import type { Question } from "../types";

export const AdminPage: React.FC = () => {
  const {
    currentPage,
    pageSize,
    isLoading,
    error,
    setQuestions,
    setCurrentPage,
    setLoading,
    setError,
    setEditingQuestion,
    setShowForm,
    removeQuestion,
  } = useAdminStore();

  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const loadQuestions = useCallback(
    async (page: number = currentPage) => {
      try {
        setLoading(true);
        setError(null);
        const response = await getQuestions(page, pageSize);
        setQuestions(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load questions"
        );
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize, setQuestions, setLoading, setError]
  );

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleCreateNew = () => {
    setEditingQuestion(null);
    setShowForm(true);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDelete = (question: Question) => {
    setQuestionToDelete(question);
  };

  const confirmDelete = async () => {
    if (!questionToDelete) return;

    try {
      setIsDeleting(true);
      setError(null);

      await deleteQuestion(questionToDelete._id);

      removeQuestion(questionToDelete._id);
      setQuestionToDelete(null);
      toast.success("Question deleted successfully");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete question"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadQuestions(page);
  };

  const handleRefresh = () => {
    loadQuestions();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="sm:text-3xl text-2xl font-bold text-gray-800">
              IELTS Question Manager
            </h1>
          </div>
          <p className="text-gray-600">
            Create, edit, and manage IELTS mock test questions
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              <Plus size={20} />
              Create Question
            </button>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={isLoading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={handleRefresh} />
          </div>
        )}

        <QuestionTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
        />

        <QuestionForm />

        <DeleteConfirmModal
          question={questionToDelete}
          isOpen={!!questionToDelete}
          isDeleting={isDeleting}
          onConfirm={confirmDelete}
          onCancel={() => setQuestionToDelete(null)}
        />
      </div>
    </div>
  );
};
