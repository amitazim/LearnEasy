import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface GetAllClassesParams {
  email?: string;
}
export const useGetAllClasses = ({ email }: GetAllClassesParams) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['classes', email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-classes?email=${email}`, { withCredentials: true })
      return res.data
    },
    initialData: []

  })

  return { data, isPending, error, refetch }

}