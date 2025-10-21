import { AlertCircle, BookOpen, CalendarIcon, CheckCircle2, Eye, FileText, Star, Users } from "lucide-react";
import { Calender } from "../calender/Calender";
import { useState } from "react";

const ToReview: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'assignments' | 'submissions' | 'grades'>('all');

  // Mock review items
  const reviewItems = [
    {
      id: 1,
      type: 'submission',
      title: 'Essay on Shakespeare',
      student: 'John Smith',
      class: 'English Literature',
      submittedAt: '2 hours ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Math Problem Set #5',
      description: 'Review and grade 25 submissions',
      class: 'Algebra II',
      dueDate: 'Tomorrow',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'grade',
      title: 'Science Lab Report',
      student: 'Emily Davis',
      class: 'Chemistry',
      submittedAt: '1 day ago',
      status: 'needs-review',
      priority: 'high'
    },
    {
      id: 4,
      type: 'submission',
      title: 'History Timeline Project',
      student: 'Michael Johnson',
      class: 'World History',
      submittedAt: '3 hours ago',
      status: 'pending',
      priority: 'low'
    },
    {
      id: 5,
      type: 'assignment',
      title: 'Physics Quiz Grades',
      description: 'Review quiz results and provide feedback',
      class: 'Physics',
      dueDate: 'Dec 27',
      status: 'pending',
      priority: 'medium'
    }
  ];

  const filteredItems = reviewItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'assignments') return item.type === 'assignment';
    if (filter === 'submissions') return item.type === 'submission';
    if (filter === 'grades') return item.type === 'grade';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'needs-review': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'submission': return <Eye className="w-4 h-4" />;
      case 'grade': return <Star className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          To Review
        </h2>
        <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
          {filteredItems.filter(item => item.status === 'pending').length} pending
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'all', label: 'All' },
          { key: 'assignments', label: 'Assignments' },
          { key: 'submissions', label: 'Submissions' },
          { key: 'grades', label: 'Grades' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              filter === tab.key
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Review Items */}
      <div className="space-y-3">
        {filteredItems.map(item => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  item.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                  item.type === 'submission' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  {item.student && (
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {item.student}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <BookOpen className="w-3 h-3" />
                    {item.class}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status.replace('-', ' ')}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  item.priority === 'high' ? 'bg-red-500' :
                  item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                {item.submittedAt && `Submitted ${item.submittedAt}`}
                {item.dueDate && `Due ${item.dueDate}`}
              </p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-gray-500">All caught up! No items to review.</p>
        </div>
      )}
    </div>
  );
};

// Main Layout Component
const Review: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'review'>('calendar');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                activeTab === 'review'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
              To Review
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'calendar' && <Calender />}
        {activeTab === 'review' && <ToReview />}
      </div>
    </div>
  );
};

export default Review;