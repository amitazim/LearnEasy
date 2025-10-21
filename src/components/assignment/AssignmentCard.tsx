import type { Assignment } from "@/types";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const AssignmentCard = ({ assignment, onDelete, isDeleting = false }: AssignmentCardProps) => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isOverdue = new Date(assignment.dueDate) < new Date();
  const daysLeft = Math.ceil(
    (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      Swal.fire("Select a file first", "", "warning");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignmentId", assignment._id);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/submit-assignment`,
        formData,
        { 
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Assignment submitted successfully.",
        timer: 1500
      });

      setShowUpload(false);
      setSelectedFile(null);
      setSubmitted(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: "Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 overflow-hidden transition-all duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-4 text-white">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base mb-1 truncate">{assignment.title}</h3>
            <p className="text-indigo-100 text-xs line-clamp-1">{assignment.description}</p>
          </div>
          <button
            onClick={() => onDelete(assignment._id)}
            disabled={isDeleting}
            className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        {/* Due Date */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
          isOverdue
            ? "bg-red-100 text-red-700"
            : daysLeft <= 1
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h12a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {isOverdue ? "OVERDUE" : `${daysLeft} days left`}
        </div>

        {/* Submit Section */}
        {submitted ? (
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <p className="text-green-700 font-medium text-sm">✓ Submitted</p>
          </div>
        ) : !showUpload ? (
          <button
            onClick={() => setShowUpload(true)}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Submit Assignment
          </button>
        ) : (
          <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <input
              type="file"
              onChange={handleFileSelect}
              className="w-full text-xs cursor-pointer"
              accept=".pdf,.doc,.docx,.txt,.zip"
            />
            
            {selectedFile && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded text-xs">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700 font-medium truncate">{selectedFile.name}</span>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowUpload(false);
                  setSelectedFile(null);
                }}
                disabled={isSubmitting}
                className="flex-1 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded text-xs font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile || isSubmitting}
                className="flex-1 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded text-xs font-medium transition-colors"
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;