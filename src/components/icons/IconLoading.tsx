import { iconDefaultClassName } from "@components/icons/constants";

export default function IconLoading({
  className = iconDefaultClassName,
}: {
  className?: string;
}) {
  return (
    <div className={`shrink-0 ${className}`}>
      <div className="w-full h-full p-[15%]">
        <div className="loader" />
      </div>
    </div>
  );
}
