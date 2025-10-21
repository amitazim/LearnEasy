import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// GET ALL COMMENTS FOR A POST
export const useGetComments = (postId: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await axios.get(
        `${BACKEND_URL}/posts/${postId}/comments`,
        { withCredentials: true }
      );
      return res.data.data || [];
    },
    initialData: [],
    enabled: !!postId
  });

  return { data, isPending, error, refetch };
};

// CREATE COMMENT
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ postId, message }: { postId: string; message: string }) => {
      const res = await axios.post(
        `${BACKEND_URL}/posts/${postId}/comments`,
        { message },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
    }
  });

  return { mutate, isPending, error, isSuccess };
};

// UPDATE COMMENT
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ commentId, message }: { commentId: string; message: string }) => {
      const res = await axios.put(
        `${BACKEND_URL}/comments/${commentId}`,
        { message },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  return { mutate, isPending, error, isSuccess };
};

// DELETE COMMENT
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async (commentId: string) => {
      const res = await axios.delete(
        `${BACKEND_URL}/comments/${commentId}`,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  return { mutate, isPending, error, isSuccess };
};