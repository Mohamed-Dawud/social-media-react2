import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Skeleton } from "@heroui/react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import type { Post } from "../types";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    if (!user?._id) return;
    try {
      const { data } = await api.get(`/users/${user._id}/posts`);
      setPosts(data.data?.posts ?? data.posts ?? []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?._id]);

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("photo", file);
      await api.put("/users/upload-photo", fd);
      await refreshUser();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload photo");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (!user || loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="overflow-hidden rounded-2xl bg-white border border-brand-100 shadow-sm">
        <div className="h-36 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" />
        <div className="flex flex-col items-center gap-2 -mt-14 pb-6 px-5">
          <Avatar
            src={user.photo}
            name={user.name}
            className="w-28 h-28 ring-4 ring-white shadow-lg text-2xl"
          />
          <div className="text-center">
            <h1 className="text-xl font-bold">{user.name}</h1>
            {user.username && <p className="text-gray-500">@{user.username}</p>}
          </div>

          <div className="flex gap-3 my-2">
            <div className="px-6 py-2 rounded-xl bg-brand-50 text-center">
              <p className="font-bold text-lg text-brand-600">{posts.length}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
          </div>

          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
          <Button
            size="sm"
            radius="full"
            isLoading={uploading}
            className="font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500 shadow-md shadow-brand-200"
            onPress={() => fileRef.current?.click()}
          >
            📷 Change photo
          </Button>
          {error && (
            <p className="text-danger text-sm bg-danger-50 rounded-lg px-3 py-1">{error}</p>
          )}
        </div>
      </section>

      <h2 className="font-bold text-lg px-1">My posts</h2>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500 rounded-2xl bg-white/80 border border-brand-100">
          <p className="text-5xl mb-3">📭</p>
          <p>You haven't posted anything yet</p>
        </div>
      )}

      {posts.map((p) => (
        <PostCard key={p._id} post={p} onChanged={fetchPosts} />
      ))}
    </div>
  );
}