// import React from 'react';
// import { BookOpen, FileText, Plus } from 'lucide-react';

// interface CreatePostProps {
//   onCreateAssignment?: () => void;
//   onCreateMaterial?: () => void;
//   onCreateAnnouncement?: () => void;
// }

// const CreatePost: React.FC<CreatePostProps> = ({ 
//   onCreateAssignment, 
//   onCreateMaterial, 
//   onCreateAnnouncement 
// }) => {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-semibold text-gray-900">Share something with your class</h3>
//       </div>
//       <div className="flex space-x-2">
//         <button 
//           onClick={onCreateAssignment}
//           className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//         >
//           <BookOpen className="w-4 h-4 mr-2" />
//           Assignment
//         </button>
//         <button 
//           onClick={onCreateMaterial}
//           className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//         >
//           <FileText className="w-4 h-4 mr-2" />
//           Material
//         </button>
//         <button 
//           onClick={onCreateAnnouncement}
//           className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Announcement
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;