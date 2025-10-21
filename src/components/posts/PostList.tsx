import React from 'react';
import { useGetAllPOst } from '@/hooks/useGetAllPost';
import type { ClassData } from '@/types';
import PostCard from './PostCard';

interface PostListProps {
  classData: ClassData
}
interface MessageData {
  classId: string;
  message: string;
  time: string; // ISO 8601 timestamp
  _id: string;
}
export const PostList: React.FC<PostListProps> = ({classData}: PostListProps) => {

  const classId = classData._id

  const {data: posts} = useGetAllPOst({classId})
  console.log(posts)
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No posts yet. Create the first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post: MessageData) => (
        <PostCard  post={post} />
      ))}
    </div>
  );
};