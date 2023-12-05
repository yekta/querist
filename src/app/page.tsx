import IconLoading from "@components/icons/IconLoading/IconLoading";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

let isInitialLoad = true;

export default function HomePage() {
  const navigate = useNavigate({ from: "/" });
  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      navigate({ to: "/tables" });
    }
  }, []);
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <IconLoading />
    </div>
  );
}
