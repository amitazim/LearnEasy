import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface GetAllClassesParams {
  classId?: string;
}
export const useGetAlFeedback = ({ classId }: GetAllClassesParams) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['classes', classId],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/submit-feedback/${classId}`, { withCredentials: true })
      return res.data
    },
    initialData: []

  })

  return { data, isPending, error, refetch }

}