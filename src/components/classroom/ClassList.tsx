
import { Link } from 'react-router';
import useAuthContext from '@/hooks/useAuthContext';
import { useGetAllClasses } from '@/hooks/useGetAllClasses';
import type React from 'react';
import type { ClassData } from '@/types';
import ClassCard from './ClassCard';
import { useEffect } from 'react';



const ClassList: React.FC = () => {
  const context = useAuthContext()
  if (!context) {
    throw new Error("error")
  }
  const { user } = context
  if (!user) {
    return
  }
  let email;
  if (user.email) {
    email = user.email
  }


  const { data: classes, isPending, error, refetch } = useGetAllClasses({ email })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // if (isPending) {
  //   return "kjxcbvkjsdc"
  // }

  // console.log(classes)


  useEffect(() => {
    refetch()
  }, [classes])


  const handleclass = (c: ClassData) => {

    fetch(`${import.meta.env.VITE_BACKEND_URL}/class/${c._id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch classes");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error("Error fetching classes:", err);
      });


  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes?.map((classData: ClassData, i: number) => (
        <Link to={`/class/${classData._id}`} onClick={() => handleclass(classData)} key={i}>
          <ClassCard


            classData={classData}
          />
        </Link>
      ))}
    </div>
  );
};

export default ClassList;