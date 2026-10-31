import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/users/signin", form);
      login(data.data?.token ?? data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="text-center mb-1">
        <h2 className="text-xl font-bold">Welcome back</h2>
        <p className="text-sm text-default-500">Login to continue</p>
      </div>

      <Input
        label="Email"
        type="email"
        variant="bordered"
        radius="lg"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        isRequired
      />
      <Input
        label="Password"
        type="password"
        variant="bordered"
        radius="lg"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        isRequired
      />

      {error && (
        <p className="text-danger text-sm bg-danger-50 rounded-lg p-2 text-center">{error}</p>
      )}

      <Button
        type="submit"
        radius="lg"
        size="lg"
        isLoading={loading}
        className="font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500 shadow-md shadow-brand-200"
      >
        Login
      </Button>
      <p className="text-sm text-center text-default-500">
        No account? <Link to="/signup" className="text-brand-600 font-medium">Sign up</Link>
      </p>
    </form>
  );
}