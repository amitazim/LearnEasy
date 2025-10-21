import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface GetAllClassesParams {
  classId?: string;
}
export const useGetAllPOst = ({ classId }: GetAllClassesParams) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['posts', classId],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/${classId}`, { withCredentials: true })
      return res.data
    },
    initialData: []

  })

  return { data, isPending, error, refetch }

}