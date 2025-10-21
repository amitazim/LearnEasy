import { useGetAllAssignments } from "@/hooks/useGetAllAssignments";
import AssignmentCard from "./AssignmentCard";
import type { Assignment, ClassData } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";

interface ClassworkTabProps {
  classData: ClassData;
}

const AllAssignments = ({ classData }: ClassworkTabProps) => {
  const classId = classData._id as string;
  const { data, isPending } = useGetAllAssignments(classId);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setAssignments(data);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Assignment?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete"
    });

    if (!result.isConfirmed) return;

    setIsDeleting(true);

    try {
      console.log("Deleting assignment:", id);
      
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete-assignments/${id}`,
        { 
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Delete response:", response.data);

      if (response.data.success) {
        setAssignments((prev) => prev.filter(a => a._id !== id));
        
        await Swal.fire({
          title: "Deleted!",
          text: "Assignment deleted successfully.",
          icon: "success",
          timer: 1500
        });
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      
      const errorMessage = error.response?.data?.message || "Failed to delete assignment";
      
      await Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin text-indigo-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {assignments && assignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((assignment: Assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border-2 border-dashed border-indigo-200">
          <p className="text-slate-600 font-semibold text-lg">No assignments yet</p>
          <p className="text-slate-500 text-sm mt-2">Assignments will appear here</p>
        </div>
      )}
    </div>
  );
};

export default AllAssignments;