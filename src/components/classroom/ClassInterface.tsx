import { useState } from 'react';
import StreamTab from '../tabs/StreamTab';
import ClassworkTab from '../tabs/ClassworkTab';
import { useLoaderData } from 'react-router';
import ClassHeader from './ClassHeader';
import type { ClassData } from '@/types';
import FeedBack from '../tabs/FeedBack';
import Post from '../tabs/Post';



const ClassInterface = () => {
  const [activeTab, setActiveTab] = useState('stream');
  const classData = useLoaderData() as ClassData;



  const renderTabContent = () => {
    switch (activeTab) {
      case 'stream':
        return (
          <StreamTab
          classData={classData}
            // // posts={posts}
            // onCreateAssignment={handleCreateAssignment}
            // onCreateMaterial={handleCreateMaterial}
            // onCreateAnnouncement={handleCreateAnnouncement}
            // onPostMenuClick={handlePostMenuClick}
          />
        );
      case 'classwork':
        return <ClassworkTab classData={classData}/>
      case 'feedback':
        return <FeedBack classData={classData}/>
      case 'post':
        return <Post classData={classData}/>
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClassHeader
        classData={classData}
        activeTab={activeTab}
        // onBack={onBack}
    
        onTabChange={setActiveTab}
      />

      <div className="max-w-4xl mx-auto p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ClassInterface;