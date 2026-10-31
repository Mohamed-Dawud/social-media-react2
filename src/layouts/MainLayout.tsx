import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <Outlet />
    </main>
  );
}