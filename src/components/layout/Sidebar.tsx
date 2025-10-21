import React from 'react';
import { Home, Calendar, BookOpen, Settings } from 'lucide-react';
import { Link } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onViewChange }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Classes', active: currentView === 'home', link: "/" },
    { id: 'calendar', icon: Calendar, label: 'Calendar', active: currentView === 'calendar', link: "/calender" },
    { id: 'review', icon: BookOpen, label: 'To Review', active: currentView === 'review', link: "/review" },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-transform duration-300 z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
      <div className="p-4 py-6
       border-b border-gray-200 flex items-center gap-3">
        <img className='h-4 w-4' src="/logo.png" alt="" />
                <h1 className="text-xl font-semibold text-gray-900">Learn Easy</h1>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center px-3 py-3 rounded-lg text-left hover:bg-gray-100 transition-colors ${item.active ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600' : 'text-gray-700'
              }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full flex items-center px-3 py-3 rounded-lg text-left hover:bg-gray-100 transition-colors text-gray-700">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;