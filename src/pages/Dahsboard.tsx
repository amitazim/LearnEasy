// // import React from 'react';
// // import { ClassList } from '../components/classroom/ClassList';
// // export const Dashboard: React.FC = () => {
// //   return (
// //     <div className="max-w-7xl mx-auto">
// //       {/* <Sidebar/> */}
// //       <ClassList />
// //     </div>
// //   );
// // };

// import React, { useState } from 'react';
// import { 
//   Home, 
//   Calendar, 
//   BookOpen, 
//   Users, 
//   Settings, 
//   Menu, 
//   ArrowLeft,
//   Plus,
//   MoreHorizontal,
//   FileText,
//   Video,
//   Link,
//   Upload
// } from 'lucide-react';

// // Mock data for classes







// const GoogleClassroomClone = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentView, setCurrentView] = useState('home');
//   const [selectedClass, setSelectedClass] = useState(null);

//   const handleClassClick = (classData) => {
//     setSelectedClass(classData);
//   };

//   const handleBackToClasses = () => {
//     setSelectedClass(null);
//   };

//   const handleViewChange = (view) => {
//     setCurrentView(view);
//     setSelectedClass(null);
//   };

//   if (selectedClass) {
//     return <ClassInterface classData={selectedClass} onBack={handleBackToClasses} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Sidebar 
//         isOpen={sidebarOpen} 
//         currentView={currentView}
//         onViewChange={handleViewChange}
//       />
      
//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="p-2 hover:bg-gray-100 rounded-lg mr-4"
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <h1 className="text-2xl font-semibold text-gray-900">My Classes</h1>
//             </div>
//             <div className="flex space-x-3">
//               <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
//                 Join Class
//               </button>
//               <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
//                 Create Class
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Classes Grid */}
//         <main className="p-6">
//           {currentView === 'home' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {mockClasses.map((classData) => (
//                 <ClassCard 
//                   key={classData.id} 
//                   classData={classData} 
//                   onClick={handleClassClick}
//                 />
//               ))}
//             </div>
//           )}

//           {currentView === 'calendar' && (
//             <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//               <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar View</h3>
//               <p className="text-gray-600">Your upcoming assignments and events will appear here</p>
//             </div>
//           )}

//           {currentView === 'assignments' && (
//             <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//               <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">To Review</h3>
//               <p className="text-gray-600">Assignments waiting for your review will appear here</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default GoogleClassroomClone;
