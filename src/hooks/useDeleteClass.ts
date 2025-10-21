import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UseDeleteClassParams {
  classId: string;
}

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ classId }: UseDeleteClassParams) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/class/${classId}`,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (error) => {
      console.error("Delete class error:", error);
    },
  });

  return { mutate, isPending, error, isSuccess };
};