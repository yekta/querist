import { iconDefaultClassName } from "@components/icons/constants";
import "./IconLoading.css";

export default function IconLoading({
  className = iconDefaultClassName,
  color = "foreground",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  color?: "foreground" | "background";
}) {
  return (
    <div {...rest} className={`shrink-0 ${className}`}>
      <div className="w-full h-full p-[15%]">
        <div
          className={`loader ${color === "background" && "loader-background"}`}
        />
      </div>
    </div>
  );
}
