import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { api } from "../api/axios";

export default function AddComment({ postId, onCreated }: { postId: string; onCreated: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await api.post(`/posts/${postId}/comments`, { content });
      setContent("");
      onCreated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        placeholder="Write a comment..."
        variant="bordered"
        radius="full"
        value={content}
        onValueChange={setContent}
      />
      <Button
        type="submit"
        radius="full"
        isLoading={loading}
        className="font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500"
      >
        Send
      </Button>
    </form>
  );
}