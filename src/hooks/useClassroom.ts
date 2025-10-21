// import { useState } from 'react';
// import type { ClassRoom, Post } from '../types';
// import useAuthContext from './useAuthContext';

// export const useClassroom = () => {
//   const { user} = useAuthContext()
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const createClass = async (classData: Omit<ClassRoom, 'id' | 'teacherId' | 'teacherName' | 'students' | 'createdAt'>) => {
//     if (!user) {
//       setError('User not authenticated');
//       return;
//     }

//     setLoading(true);
//     try {
//       const newClass: ClassRoom = {
//         ...classData,
//         id: Date.now().toString(),
//         teacherId: user.id,
//         teacherName: user.name,
//         students: [],
//         createdAt: new Date()
//       };
//       addClass(newClass);
//       setError(null);
//       return newClass;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError('Failed to create class');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const joinClassByCode = async (code: string) => {
//     setLoading(true);
//     try {
//       const success = joinClass(code);
//       if (!success) {
//         setError('Invalid class code or already joined');
//         return false;
//       }
//       setError(null);
//       return true;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError('Failed to join class');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createPost = async (postData: Omit<Post, 'id' | 'authorId' | 'authorName' | 'createdAt'>) => {
//     if (!user) {
//       setError('User not authenticated');
//       return;
//     }

//     setLoading(true);
//     try {
//       const newPost: Post = {
//         ...postData,
//         id: Date.now().toString(),
//         authorId: user.id,
//         authorName: user.name,
//         createdAt: new Date()
//       };
//       addPost(newPost);
//       setError(null);
//       return newPost;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError('Failed to create post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     createClass,
//     joinClassByCode,
//     createPost,
//     loading,
//     error,
//     clearError: () => setError(null)
//   };
// };
