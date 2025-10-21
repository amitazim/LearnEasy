import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UseDeleteClassParams {
  id: string;
}

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ id }: UseDeleteClassParams) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  return { mutate, isPending, error, isSuccess };
};