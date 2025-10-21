// data/mockData.ts

import type { PostData, StudentData } from "@/types";

// export const mockClasses: ClassData[] =

export const mockPosts: PostData[] = [
  {
    id: 1,
    type: "assignment",
    title: "Weekly Assignment #3",
    description: "Complete exercises 1-15 from Chapter 5",
    dueDate: "Due Tomorrow",
    author: "Dr. Sarah Johnson",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    type: "material",
    title: "Lecture Notes - Quadratic Equations",
    description: "Today's lecture materials and additional resources",
    author: "Dr. Sarah Johnson",
    timestamp: "1 day ago"
  },
  {
    id: 3,
    type: "announcement",
    title: "Mid-term Exam Schedule",
    description: "The mid-term examination will be held on Friday, March 15th at 2:00 PM in Room 204.",
    author: "Dr. Sarah Johnson",
    timestamp: "3 days ago"
  }
];

export const mockStudents: StudentData[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com"
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.johnson@email.com"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@email.com"
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@email.com"
  }
];


export const faqData = {
  classes: {
    enrollment: {
      "what classes am i enrolled in": "You are enrolled in Math, English, Science, and History.",
      "my classes": "You are enrolled in Math, English, Science, and History.",
      "show my classes": "You are enrolled in Math, English, Science, and History."
    },
    schedule: {
      "when is my next class": "Your next class is Math at 10:00 AM tomorrow.",
      "next class": "Your next class is Math at 10:00 AM tomorrow.",
      "next class schedule": "Your next class is Math at 10:00 AM tomorrow.", // added
      "class schedule": "Yes, the weekly schedule is available on the class dashboard under 'Schedule'."
    }
    ,
    teachers: {
      "who teaches chemistry": "Your Chemistry teacher is Mr. Rahman.",
      "chemistry teacher": "Your Chemistry teacher is Mr. Rahman.",
      "contact teacher": "Go to the class page and click 'Contact Teacher' to send a message."
    },
    joining: {
      "join class": "Yes! You can join using the class code provided by your teacher.",
      "class code": "The code for History 101 is HST123. You can use any class code provided by your teacher to join.",
      "leave class": "Go to the class page, click on settings, and select 'Leave class'.",
      "leave a class": "Go to the class page, click on settings, and select 'Leave class'.", // added
      "archived classes": "Yes, click on 'Archived Classes' to see all classes you were enrolled in."
    },
    details: {
      "how many students": "There are 32 students currently enrolled in your English class.",
      "students in class": "There are 32 students currently enrolled in your English class."
    }
  },
  assignments: {
    due: {
      "assignments due": "You have Math homework due Thursday and Science lab report due Friday.",
      "what's due": "You have Math homework due Thursday and Science lab report due Friday.",
      "homework": "You have Math homework due Thursday and Science lab report due Friday."
    },
    submission: {
      "submit assignment": "Open the assignment, click 'Submit', upload your file, and confirm submission.",
      "how to submit": "Open the assignment, click 'Submit', upload your file, and confirm submission.",
      "resubmit": "Yes, if your teacher allows it. Check the assignment page for resubmission options.",
      "late submission": "Late submission depends on your teacher's settings; some allow it with a penalty.",
      "multiple files": "Yes, you can upload multiple files before submitting."
    },
    grading: {
      "check grades": "Click on the assignment and view your grade under 'Results'.",
      "assignment grades": "Click on the assignment and view your grade under 'Results'.",
      "feedback": "Teachers can leave comments; check the assignment page under 'Comments'."
    },
    teacher: {
      "create assignment": "Click 'Create Assignment', add title, instructions, due date, and post it to the class.",
      "delete assignment": "Yes, go to the assignment page and select 'Delete Assignment'."
    },
    management: {
      "past assignments": "Click 'Assignments' in the class menu and filter by 'Completed' or 'All Assignments'."
    }
  },
  announcements: {
    create: {
      "post announcement": "Go to the class, click 'Post Announcement', type your message, and publish.",
      "create announcement": "Go to the class, click 'Post Announcement', type your message, and publish.",
      "edit announcement": "Yes, click 'Edit' on your announcement.",
      "delete announcement": "Click the options menu on your announcement and select 'Delete'."
    },
    features: {
      "schedule announcement": "Yes, use the scheduling feature when creating the announcement.",
      "pin announcement": "Yes, click the pin icon to keep it at the top of the feed.",
      "reply to announcement": "Yes, if your teacher enabled replies for that announcement."
    },
    viewing: {
      "see announcements": "Click 'Announcements' in the class menu to see the complete list.",
      "search announcement": "Use the search bar in the 'Announcements' section to find keywords.",
      "who can see": "All students in the class can view announcements.",
      "notifications": "Yes, enable notifications in your account settings."
    }
  },
  grades: {
    overview: {
      "my grades": "Your grades are: Math - A, English - B+, Science - A-, History - B.",
      "show grades": "Your grades are: Math - A, English - B+, Science - A-, History - B.",
      "semester grades": "Your grades are: Math - A, English - B+, Science - A-, History - B.",
      "science average": "Your average grade in Science is A-."
    },
    reports: {
      "download report card": "Go to 'Reports' and click 'Download Report Card'.",
      "report card": "Go to 'Reports' and click 'Download Report Card'.",
      "exam grades": "Go to 'Reports' → 'Exam Grades' → 'Download'."
    },
    analysis: {
      "compare grades": "You can see class averages, but individual grades are private.",
      "top students": "The leaderboard lists students with the highest grades.",
      "calculate gpa": "GPA is calculated based on grades and credit points; see your report card for details.",
      "gpa": "GPA is calculated based on grades and credit points; see your report card for details."
    },
    management: {
      "grade review": "Yes, click 'Request Review' on the assignment or exam grade page.",
      "track progress": "Your progress dashboard shows grades, completion status, and upcoming deadlines.",
      "assignment marks": "Yes, go to Science class → Assignments → View Grades."
    }
  },
  materials: {
    files: {
      "class files": "All English class files are under 'Class Materials → English'.",
      "upload notes": "Click 'Upload Material' in the class page and select your files.",
      "recorded lectures": "Yes, recordings are available under 'Lectures'.",
      "download lectures": "Yes, recordings are available under 'Lectures'."
    },
    organization: {
      "search materials": "Use the search bar in 'Class Materials' and enter the topic name.",
      "organize folders": "Click 'New Folder' in 'Class Materials' and drag files into it.",
      "download multiple": "Select the files and click 'Download All'."
    },
    sharing: {
      "share materials": "Yes, select the files and click 'Share with class'.",
      "comment on materials": "Open the material and use the 'Add Comment' feature."
    },
    operations: {
      "delete files": "Yes, select the file and click 'Delete'.",
      "mark important": "Yes, click the star icon next to the file."
    }
  }
};

export const feedbackTypes = [
  { value: 'suggestion', label: 'Suggestion', icon: '💡', color: 'bg-blue-100 text-blue-700' },
  { value: 'compliment', label: 'Compliment', icon: '👏', color: 'bg-green-100 text-green-700' },
  { value: 'complaint', label: 'Issue', icon: '⚠️', color: 'bg-red-100 text-red-700' },
  { value: 'question', label: 'Question', icon: '❓', color: 'bg-purple-100 text-purple-700' }
];

export const categories = [
  { value: 'teaching', label: 'Teaching Method' },
  { value: 'content', label: 'Course Content' },
  { value: 'assignments', label: 'Assignments' },
  { value: 'general', label: 'General' }
];
