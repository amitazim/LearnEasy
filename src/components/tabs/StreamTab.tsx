
import AllAssingments from '../assignment/AllAssingments';
import type { ClassData } from '@/types';


interface ClassworkTabProps {
  classData: ClassData;
}

const StreamTab= ({classData}: ClassworkTabProps) => {
 
  return (
    <div>
     
     <AllAssingments classData={classData}/>
    </div>
  );
};

export default StreamTab;