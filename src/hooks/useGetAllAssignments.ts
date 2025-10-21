import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllAssignments = (classId: string) => {
  const { isPending, error, data, refetch } = useQuery({
    // queryKey: ['assignments'],
    queryKey: ['assignments', classId],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-assignments?classId=${classId}`, { withCredentials: true })
      // const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-assignments`, { withCredentials: true })
      return res.data
    },
    initialData: []

  })

  return { data, isPending, error, refetch }

}