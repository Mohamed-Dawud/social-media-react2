import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-brand-100 shadow-2xl shadow-brand-200/50 p-8">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-brand-300/60">
            C
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
            CIRCLE
          </h1>
          <p className="text-xs text-gray-400 mt-1">Connect. Share. Belong.</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}