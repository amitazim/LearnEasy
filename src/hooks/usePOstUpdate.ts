import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UseUpdateClassParams {
  id: string;
  data: Record<string, any>;
}
export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ id, data }: UseUpdateClassParams) => {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`,
        data,
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
      console.error("Update error:", error);
    },
  });

  return { mutate, isPending, error, isSuccess };
};