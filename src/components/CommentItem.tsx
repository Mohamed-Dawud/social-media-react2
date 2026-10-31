import { useState } from "react";
import { Avatar, Button, Input } from "@heroui/react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { Comment } from "../types";

type Props = { comment: Comment; postId: string; onChanged: () => void };

export default function CommentItem({ comment, postId, onChanged }: Props) {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const author = comment.commentCreator ?? comment.user;
  const isOwner = !!user && author?._id === user._id;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/posts/${postId}/comments/${comment._id}`, { content });
      setEditing(false);
      onChanged();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;
    await api.delete(`/posts/${postId}/comments/${comment._id}`);
    onChanged();
  };

  return (
    <div className="flex gap-3 items-start">
      <Avatar size="sm" src={author?.photo} name={author?.name} />
      <div className="flex-1">
        <div className="bg-brand-50 rounded-2xl rounded-tl-sm px-4 py-2">
          <p className="font-semibold text-sm text-brand-700">{author?.name}</p>
          {editing ? (
            <div className="flex gap-2 mt-1">
              <Input size="sm" variant="bordered" value={content} onValueChange={setContent} />
              <Button size="sm" color="primary" isLoading={loading} onPress={handleUpdate}>
                Save
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-800">{comment.content}</p>
          )}
        </div>
        <div className="flex items-center gap-3 px-2 mt-1">
          <span className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
          {isOwner && !editing && (
            <>
              <button className="text-xs text-gray-500 hover:text-brand-600" onClick={() => setEditing(true)}>
                Edit
              </button>
              <button className="text-xs text-gray-500 hover:text-red-500" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}