import BrandMark from "@components/logos/BrandMark";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-center border-b border-c-outline">
      <div className="w-full flex items-center justify-between">
        <Link to="/" className="p-2.5">
          <BrandMark />
        </Link>
      </div>
    </div>
  );
}
