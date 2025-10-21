// // src/pages/ClassRoom.tsx
// import React, { useEffect } from 'react';
// import { CreatePost } from '../components/posts/CreatePost';
// import { PostList } from '../components/posts/PostList';
// import { useParams } from 'react-router';
// import useAuthContext from '../hooks/useAuthContext';

// export const ClassRoom: React.FC = () => {
//   const { classId } = useParams<{ classId: string }>();
//   const { classes, getClassPosts, setCurrentClass, user } = useAuthContext();
  
//   const classRoom = classes.find(c => c.id === classId);
//   const posts = classId ? getClassPosts(classId) : [];

//   useEffect(() => {
//     if (classRoom) {
//       setCurrentClass(classRoom);
//     }
//     return () => setCurrentClass(null);
//   }, [classRoom, setCurrentClass]);

//   if (!classRoom) {
//     return (
//       <div className="p-6">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Class not found</h2>
//           <p className="text-gray-600 mt-2">The class you're looking for doesn't exist or you don't have access to it.</p>
//         </div>
//       </div>
//     );
//   }

//   const canPost = user && (classRoom.teacherId === user.id || classRoom.students.includes(user.id));

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Class Header */}
//       <div 
//         className="rounded-lg p-6 mb-6 text-white"
//         style={{ backgroundColor: classRoom.color }}
//       >
//         <h1 className="text-3xl font-bold mb-2">{classRoom.name}</h1>
//         <p className="text-lg opacity-90 mb-1">{classRoom.teacherName}</p>
//         <p className="opacity-75">{classRoom.description}</p>
//         <div className="mt-4 flex items-center space-x-4 text-sm">
//           <span>Code: {classRoom.code}</span>
//           <span>{classRoom.students.length} students</span>
//         </div>
//       </div>

//       {/* Create Post */}
//       {canPost && <CreatePost classId={classRoom.id} />}

//       {/* Posts */}
//       <PostList posts={posts} />
//     </div>
//   );
// };
