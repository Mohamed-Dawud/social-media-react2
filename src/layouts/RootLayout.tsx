import { Outlet } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";

export default function RootLayout() {
  return (
    <div className="relative isolate min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-accent-300/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#99f6e4_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <AppNavbar />
      <Outlet />
    </div>
  );
}