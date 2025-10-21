import { getRandomDarkColor } from '@/lib/utils';
import type { ClassData } from '@/types';
import React, { useState } from 'react';
import { Trash2, MoreHorizontal } from 'lucide-react';
import { useDeleteClass } from '@/hooks/useDeleteClass';

interface ClassCardProps {
  classData: ClassData;
  onDeleted?: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, onDeleted }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { mutate: deleteClass, isPending: isDeleting } = useDeleteClass();

 const handleDeleteClass = () => {
  if (!classData._id) {
    alert('Class ID is missing');
    return;
  }

  if (window.confirm(`Are you sure you want to delete "${classData.name}"? This action cannot be undone.`)) {
    deleteClass(
      { classId: classData._id },  // ✅ Now classData._id is definitely a string
      {
        onSuccess: () => {
          setShowMenu(false);
          onDeleted?.();
        },
        onError: (error) => {
          alert('Failed to delete class');
          console.error(error);
        }
      }
    );
  }
};
  return (
    <div
      className="rounded-lg p-4 text-white bg-gray-600 cursor-pointer hover:opacity-90 transition-opacity flex flex-col relative"
      style={{ background: getRandomDarkColor() }}
    >
      {/* Delete Button */}
      <div className="absolute top-2 right-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowMenu(!showMenu);
          }}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          disabled={isDeleting}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        {/* Delete Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-lg shadow-lg z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDeleteClass();
              }}
              disabled={isDeleting}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? 'Deleting...' : 'Delete Class'}
            </button>
          </div>
        )}
      </div>

      {/* Class Info */}
      <div className="mb-4 grow">
        <h3 className="text-xl font-semibold mb-1">{classData?.name}</h3>
        <p className="text-sm opacity-90">{classData?.teacher}</p>
      </div>

      {/* Description */}
      <div className="bg-opacity-10 p-2 bg-[#fafbfb33] rounded mb-3">
        <p className="text-sm">{classData?.description}</p>
      </div>

      {/* Code */}
      <div className="flex justify-between items-center text-sm">
        <span>Class Code: {classData?.code}</span>
      </div>
    </div>
  );
};

export default ClassCard;