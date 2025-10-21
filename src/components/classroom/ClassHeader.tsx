import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { getRandomDarkColor } from '@/lib/utils';
import type { ClassData } from '@/types';

interface ClassHeaderProps {
  classData: ClassData;
  activeTab: string;
  // onBack: () => void;
  onTabChange: (tab: string) => void;
}

const ClassHeader: React.FC<ClassHeaderProps> = ({
  classData,
  activeTab,
  // onBack, 
  onTabChange
}) => {
  const tabs = [
    { id: 'stream', label: 'Stream' },
    { id: 'classwork', label: 'Classwork' },
    { id: 'feedback', label: 'FeedBack' },
    { id: 'post', label: 'Post' }
  ];
// console.log(classData)
  return (
    <div className={` text-white`} style={{ background: getRandomDarkColor() }}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Link
            to={"/"}
            // onClick={onBack}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{classData.name}</h1>
            <p className="opacity-90">{classData.teacher}</p>
          </div>
        </div>
        <div className="flex items-center text-sm opacity-90">
          <span className="mr-6">Class code: {classData.code}</span>
          <span className="mr-6 font-bold">Join Class code: {classData.joinCode}</span>

        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-white border-opacity-20">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-3 font-medium transition-colors relative ${activeTab === tab.id
                ? 'text-white'
                : 'text-white text-opacity-70 hover:text-white hover:text-opacity-90'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;