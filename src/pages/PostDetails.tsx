import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Skeleton } from "@heroui/react";
import { api } from "../api/axios";
import PostCard from "../components/PostCard";
import CommentItem from "../components/CommentItem";
import AddComment from "../components/AddComment";
import type { Post, Comment } from "../types";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data.data?.post ?? data.post ?? null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load post");
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/posts/${id}/comments`);
      setComments(data.data?.comments ?? data.comments ?? []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load comments");
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPost(), fetchComments()]).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center bg-danger-50 rounded-2xl p-3 mt-6">{error}</p>;
  }

  if (!post) {
    return <p className="text-center mt-10 text-gray-500">Post not found</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Button
        size="sm"
        radius="full"
        className="self-start bg-white border border-brand-100 text-brand-700 font-medium"
        onPress={() => navigate(-1)}
      >
        ← Back
      </Button>

      <PostCard post={post} onChanged={fetchPost} onDeleted={() => navigate("/")} />

      <section className="rounded-2xl bg-white border border-brand-100 shadow-sm">
        <div className="p-5 flex flex-col gap-4">
          <h2 className="font-bold text-lg">💬 Comments ({comments.length})</h2>
          <AddComment postId={post._id} onCreated={fetchComments} />

          <div className="flex flex-col gap-4">
            {comments.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No comments yet. Start the conversation!
              </p>
            )}
            {comments.map((c) => (
              <CommentItem key={c._id} comment={c} postId={post._id} onChanged={fetchComments} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}