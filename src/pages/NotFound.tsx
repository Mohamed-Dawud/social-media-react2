import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center text-center py-20 gap-3">
      <h1 className="text-8xl font-extrabold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
        404
      </h1>
      <p className="text-xl font-semibold">Page not found</p>
      <p className="text-gray-500">The page you're looking for doesn't exist.</p>
      <Button
        as={Link}
        to="/"
        radius="full"
        className="mt-2 font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500"
      >
        Back to home
      </Button>
    </div>
  );
}