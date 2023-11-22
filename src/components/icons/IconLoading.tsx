import { iconDefaultClassName } from "@components/icons/constants";

export default function IconLoading({
  className = iconDefaultClassName,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={`shrink-0 ${className}`}>
      <div className="w-full h-full p-[15%]">
        <div className="loader" />
      </div>
    </div>
  );
}
