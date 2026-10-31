import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

export default function ChangePassword() {
  const [form, setForm] = useState({ password: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.patch("/users/change-password", form);
      setSuccess("Password changed successfully");
      setForm({ password: "", newPassword: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="text-center mb-1">
        <h2 className="text-xl font-bold">Change password</h2>
        <p className="text-sm text-default-500">Keep your account secure</p>
      </div>

      <Input
        label="Current password"
        type="password"
        variant="bordered"
        radius="lg"
        value={form.password}
        onValueChange={(v) => setForm({ ...form, password: v })}
        isRequired
      />
      <Input
        label="New password"
        type="password"
        variant="bordered"
        radius="lg"
        value={form.newPassword}
        onValueChange={(v) => setForm({ ...form, newPassword: v })}
        isRequired
      />

      {error && (
        <p className="text-danger text-sm bg-danger-50 rounded-lg p-2 text-center">{error}</p>
      )}
      {success && (
        <p className="text-success text-sm bg-success-50 rounded-lg p-2 text-center">{success}</p>
      )}

      <Button
        type="submit"
        radius="lg"
        size="lg"
        isLoading={loading}
        className="font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500 shadow-md shadow-brand-200"
      >
        Update password
      </Button>
      <Link to="/" className="text-sm text-center text-default-500 hover:text-brand-600">
        ← Back to home
      </Link>
    </form>
  );
}