
import React, { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, X, Check, MessageCircle } from 'lucide-react';
import { useUpdateClass } from '@/hooks/usePOstUpdate';
import { useDeleteClass } from '@/hooks/usePostDelete';
import { useCreateComment, useDeleteComment, useGetComments, useUpdateComment } from '@/hooks/useComments';


export interface MessageData {
  _id: string;
  classId: string;
  message: string;
  time: string;
}

interface PostCardProps {
  post: MessageData;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(post.message);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  // Post hooks
  const { mutate: updatePost, isPending: isUpdating } = useUpdateClass();
  const { mutate: deletePost, isPending: isDeleting } = useDeleteClass();

  // Comments hooks
  const { data: comments, isPending: isLoadingComments, refetch: refetchComments } = useGetComments(post._id);
  const { mutate: createComment, isPending: isCreatingComment } = useCreateComment();
  const { mutate: updateComment, isPending: isUpdatingComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  // POST HANDLERS
  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSave = () => {
    if (editMessage.trim() === '') {
      alert('Message cannot be empty');
      return;
    }

    updatePost(
      { id: post._id, data: { message: editMessage } },
      {
        onSuccess: () => {
          setIsEditing(false);
          setShowMenu(false);
        },
        onError: () => {
          alert('Failed to update post');
        }
      }
    );
  };

  const handleCancel = () => {
    setEditMessage(post.message);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(
        { id: post._id },
        {
          onSuccess: () => {
            setShowMenu(false);
            onDelete?.(post._id);
          },
          onError: () => {
            alert('Failed to delete post');
          }
        }
      );
    }
  };

  // COMMENT HANDLERS
  const handleAddComment = () => {
    if (newComment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }

    createComment(
      { postId: post._id, message: newComment },
      {
        onSuccess: () => {
          setNewComment('');
          refetchComments();
        },
        onError: () => {
          alert('Failed to add comment');
        }
      }
    );
  };

  const handleUpdateComment = (commentId: string) => {
    if (editingCommentText.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }

    updateComment(
      { commentId, message: editingCommentText },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditingCommentText('');
          refetchComments();
        },
        onError: () => {
          alert('Failed to update comment');
        }
      }
    );
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(commentId, {
        onSuccess: () => {
          refetchComments();
        },
        onError: () => {
          alert('Failed to delete comment');
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
      {/* POST HEADER */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            P
          </div>
          <div>
            <p className="font-medium text-gray-900">Demo User</p>
            <p className="text-sm text-gray-500">{new Date(post.time).toLocaleString()}</p>
          </div>
        </div>

        {/* MENU */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            disabled={isUpdating || isDeleting}
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={handleEdit}
                disabled={isUpdating || isDeleting}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isUpdating || isDeleting}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* POST CONTENT */}
      <div className="mb-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">{post.message}</p>
        )}
      </div>

      {/* COMMENTS TOGGLE */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4"
      >
        <MessageCircle className="w-4 h-4" />
        {comments.length} Comments
      </button>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="border-t pt-4 space-y-4">
          {/* NEW COMMENT INPUT */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleAddComment}
              disabled={isCreatingComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm"
            >
              {isCreatingComment ? '...' : 'Post'}
            </button>
          </div>

          {/* COMMENTS LIST */}
          {isLoadingComments ? (
            <p className="text-sm text-gray-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet</p>
          ) : (
            <div className="space-y-3">
              {comments.map((comment: any) => (
                <div key={comment._id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{comment.userName}</p>
                      <p className="text-xs text-gray-500">{new Date(comment.time).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditingCommentText(comment.message);
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="p-1 hover:bg-red-200 rounded text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {editingCommentId === comment._id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        className="w-full p-2 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateComment(comment._id)}
                          disabled={isUpdatingComment}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700">{comment.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;