// import React, { useState } from 'react';
// import { Button } from '../common/Button';
// import useAuthContext from '../../hooks/useAuthContext';

// export const Login: React.FC = () => {
//   const { setUser } = useAuthContext();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Mock login - in real app, this would be Firebase auth
//     const mockUser = {
//       id: '1',
//       email,
//       name: 'John Doe',
//       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
//       role: 'student' as const
//     };
//     setUser(mockUser);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to Classroom
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="sr-only">Email</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div>
//             <Button type="submit" className="w-full">
//               Sign in
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
