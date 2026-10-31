import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/react";
import { api } from "../api/axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import type { Post } from "../types";

function PostSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-brand-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-3 w-1/3 rounded-lg" />
          <Skeleton className="h-3 w-1/4 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-3 w-full rounded-lg" />
      <Skeleton className="h-3 w-4/5 rounded-lg" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data.data?.posts ?? data.posts ?? []);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <CreatePost onCreated={fetchPosts} />

      {loading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      {error && (
        <p className="text-danger text-center bg-danger-50 rounded-2xl p-3">{error}</p>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16 text-gray-500 rounded-2xl bg-white/80 border border-brand-100">
          <p className="text-5xl mb-3">📝</p>
          <p className="font-semibold">No posts yet</p>
          <p className="text-sm">Be the first to share something!</p>
        </div>
      )}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} onChanged={fetchPosts} />
      ))}
    </div>
  );
}