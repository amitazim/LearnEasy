
import { BookOpen } from 'lucide-react';
import { CreateAssignment } from '../assignment/CreateAssignment';
import type { ClassData } from '@/types';


interface ClassworkTabProps {
  classData: ClassData;
}
const ClassworkTab= ({classData}: ClassworkTabProps) => {
  // console.log(classData)
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center max-w-md mx-auto">
      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No classwork yet</h3>
      <p className="text-gray-600 mb-6">Create your first assignment to get started</p>

      <CreateAssignment classData={classData}/>
    </div>
  );
};

export default ClassworkTab;