export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  description: string;
  code: string;
  teacherId: string;
  teacherName: string;
  students: string[];
  createdAt: Date;
  subject: string;
  color: string;
}

export interface Post {
  id: string;
  classId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: Date;
  type: 'announcement' | 'assignment' | 'material';
  attachments?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}
// types/index.ts

export interface ClassData {
  _id?: string,

  name: string;
  teacher: string;
  description: string;
  code: string;
  students?: string[],
  joinCode: string
}

export interface PostData {
  id: number;
  type: 'assignment' | 'material' | 'announcement';
  title: string;
  description: string;
  dueDate?: string;
  author: string;
  timestamp: string;
}

export interface StudentData {
  id: number;
  name: string;
  email: string;
}

export interface AssignmentData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  classId: number;
  submissions?: SubmissionData[];
}

export interface SubmissionData {
  id: number;
  studentId: number;
  assignmentId: number;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
}

export 
type FeedbackFormValues = {
  type: string;
  category: string;
  rating: number;
  message: string;
};

