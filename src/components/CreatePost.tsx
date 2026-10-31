import { useState } from "react";
import { Textarea, Button, Avatar } from "@heroui/react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CreatePost({ onCreated }: { onCreated: () => void }) {
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() && !image) return;
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("body", body);
      if (image) fd.append("image", image);
      await api.post("/posts", fd);
      setBody("");
      setImage(null);
      onCreated();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-brand-100 shadow-sm">
      <form onSubmit={onSubmit} className="p-5 flex gap-3">
        <Avatar isBordered color="primary" src={user?.photo} name={user?.name} />
        <div className="flex-1 flex flex-col gap-3">
          <Textarea
            placeholder={`What's on your mind${user?.name ? ", " + user.name.split(" ")[0] : ""}?`}
            variant="faded"
            radius="lg"
            value={body}
            onValueChange={setBody}
          />

          {image && (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="rounded-xl max-h-60 w-full object-cover"
              />
              <Button
                size="sm"
                isIconOnly
                radius="full"
                className="absolute top-2 right-2"
                onPress={() => setImage(null)}
              >
                ✕
              </Button>
            </div>
          )}

          {error && (
            <p className="text-danger text-sm bg-danger-50 rounded-lg px-3 py-1">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <label className="cursor-pointer text-sm font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 transition px-3 py-1.5 rounded-full">
              🖼️ Add photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>
            <Button
              type="submit"
              radius="full"
              isLoading={loading}
              className="font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500 shadow-md shadow-brand-200"
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}