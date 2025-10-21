// import React, { useContext, useState } from 'react';
// import { getInitials } from '../../urils/helpers';
// import { AuthContext } from '@/providers/AuthProviders';

// export const Header: React.FC = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     return "Error"
//   }

//   const { user, setUser } = context
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     setUser(null);
//     setDropdownOpen(false);
//   };

//   return (
//     <header className="bg-white shadow-sm border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <h1 className="text-xl font-semibold text-gray-900">Classroom</h1>
//           </div>

//           <div className="relative">
//             <button
//               className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             >
//               {user?.avatar ? (
//                 <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
//               ) : (
//                 <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
//                   {user ? getInitials(user.name) : 'U'}
//                 </div>
//               )}
//             </button>

//             {dropdownOpen && (
//               <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                 <div className="py-1">
//                   <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                     <p className="font-medium">{user?.name}</p>
//                     <p className="text-gray-500">{user?.email}</p>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Sign out
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };