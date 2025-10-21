import React, { useState } from 'react';
import { Menu, Calendar, BookOpen } from 'lucide-react';
import Sidebar from './Sidebar';
import { Button } from '../ui/button';
import { Outlet, useLocation } from 'react-router';
import AddClass from '../classroom/AddClass';
import useAuthContext from '@/hooks/useAuthContext';
import JoinClassModal from '../common/JoinClassModal';
import Swal from 'sweetalert2';
import Chatbott from '../chatbot/Chatbott';





const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  // const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  // const [classes, setClasses] = useState([]);

  const context = useAuthContext()
  if (!context) {
    throw new Error("error")
  }
  const { user, logoutUser } = context
  // console.log(user)

 

  // Optional: only show on specific conditions





  const handleViewChange = (view: string) => {
    setCurrentView(view);
    // setSelectedClass(null);
  };


  const location = useLocation()
  // console.log(location)



  
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logged out!"
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Logged out successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }).then(err => {
            console.log(err)
          })
      }
    });


  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className='md:flex items-center gap-2 hidden'>
                <img className='h-7 w-7' src="/logo.png" alt="" />
                <h1 className="text-2xl font-semibold text-gray-900">Learn Easy</h1>
              </div>
            </div>
            <div className="flex space-x-3">
              {/* {
                location.pathname == "/" &&
                <div className="relative inline-block" ref={dropdownRef}>
                 
                  <Button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Class actions"
                    className='bg-white border border-orange-600 text-orange-600 hover:bg-gray-100 hover:border-none cursor-pointer'
                  >
                    <Plus
                      className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                    />
                  </Button>

                 
                  {isOpen && (
                    <div className="absolute top-full right-0 mt-2  bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                      <div className='flex flex-col items-center gap-2 p-2 w-full' onClick={handleClick}>
                        <JoinClassModal />
                        <AddClass />
                      </div>


                    </div>
                  )}
                </div>
              } */}
              {location.pathname === "/" && (
                <div className="flex gap-2">
                  <Button variant={'link'} className='cursor-pointer' onClick={()=>window.location.href="https://flow-with-gamification.netlify.app/"}>Take a Test</Button>
                  <JoinClassModal />
                  <AddClass />
                </div>
              )}
              {
                user && <div className='flex items-center gap-2'>
                  <Button className='w-fit ' variant={'outline'}><img className='h-6 rounded-full w-full' src={user?.photoURL || undefined} alt="" /></Button>
                  <Button className='bg-orange-600' onClick={handleLogout}>Logout</Button>
                </div>
              }
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">

          {/* <ClassList
            classes={classes}
          /> */}
          <Outlet />
          <Chatbott />

          {currentView === 'calendar' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar View</h3>
              <p className="text-gray-600">Your upcoming assignments and events will appear here</p>
            </div>
          )}

          {currentView === 'assignments' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">To Review</h3>
              <p className="text-gray-600">Assignments waiting for your review will appear here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;