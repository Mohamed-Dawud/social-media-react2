import { useState } from "react";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", username: "", email: "", dateOfBirth: "",
    gender: "", password: "", rePassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/users/signup", form);
      navigate("/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="text-center mb-1">
        <h2 className="text-xl font-bold">Create account</h2>
        <p className="text-sm text-default-500">Join CIRCLE today</p>
      </div>

      <Input label="Name" name="name" variant="bordered" radius="lg" onChange={onChange} isRequired />
      <Input label="Username" name="username" variant="bordered" radius="lg" onChange={onChange} isRequired />
      <Input label="Email" name="email" type="email" variant="bordered" radius="lg" onChange={onChange} isRequired />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Date of birth"
          name="dateOfBirth"
          type="date"
          variant="bordered"
          radius="lg"
          onChange={onChange}
          isRequired
        />
        <Select label="Gender" name="gender" variant="bordered" radius="lg" onChange={onChange} isRequired>
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>
      </div>
      <Input label="Password" name="password" type="password" variant="bordered" radius="lg" onChange={onChange} isRequired />
      <Input label="Confirm password" name="rePassword" type="password" variant="bordered" radius="lg" onChange={onChange} isRequired />

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
        Sign up
      </Button>
      <p className="text-sm text-center text-default-500">
        Already have an account? <Link to="/signin" className="text-brand-600 font-medium">Login</Link>
      </p>
    </form>
  );
}