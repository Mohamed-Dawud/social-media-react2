import { useState } from "react";
import { Avatar, Button, Textarea } from "@heroui/react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { Post } from "../types";

type Props = {
  post: Post;
  onChanged: () => void;
  onDeleted?: () => void;
};

export default function PostCard({ post, onChanged, onDeleted }: Props) {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);

  const isOwner = !!user && post.user?._id === user._id;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("body", body);
      await api.put(`/posts/${post._id}`, fd);
      setEditing(false);
      onChanged();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/posts/${post._id}`);
    if (onDeleted) onDeleted();
    else onChanged();
  };

  return (
    <article className="rounded-2xl bg-white border border-brand-100 border-l-4 border-l-brand-500 shadow-sm transition duration-200 hover:shadow-lg hover:shadow-brand-100">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Avatar isBordered color="primary" src={post.user?.photo} name={post.user?.name} />
          <div className="flex-1 min-w-0">
            <p className="font-bold leading-tight truncate">{post.user?.name}</p>
            <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
          </div>

          {isOwner && (
            <div className="flex gap-1">
              <Button
                size="sm"
                radius="full"
                variant="flat"
                className="bg-brand-50 text-brand-700"
                onPress={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "✏️ Edit"}
              </Button>
              <Button size="sm" radius="full" variant="flat" color="danger" onPress={handleDelete}>
                🗑️
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4">
          {editing ? (
            <div className="flex flex-col gap-2">
              <Textarea variant="bordered" value={body} onValueChange={setBody} />
              <Button
                size="sm"
                radius="full"
                isLoading={loading}
                className="self-end font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500"
                onPress={handleUpdate}
              >
                Save changes
              </Button>
            </div>
          ) : (
            <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{post.body}</p>
          )}

          {post.image && (
            <img src={post.image} alt="" className="mt-4 rounded-xl w-full max-h-[28rem] object-cover" />
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-brand-50 flex">
          <Button
            as={Link}
            to={`/posts/${post._id}`}
            size="sm"
            radius="full"
            className="bg-brand-50 text-brand-700 font-semibold"
          >
            💬 Comments
          </Button>
        </div>
      </div>
    </article>
  );
}