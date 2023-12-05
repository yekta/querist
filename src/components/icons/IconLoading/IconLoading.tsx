import { iconDefaultClassName } from "@components/icons/constants";
import "./IconLoading.css";
import { cn } from "@components/primitives/utils";

export default function IconLoading({
  className = iconDefaultClassName,
  colorClassName = "bg-foreground",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  colorClassName?: string;
}) {
  return (
    <div {...rest} className={cn("shrink-0", className)}>
      <div className="w-full h-full p-[15%]">
        <div className="loader-container">
          <div className={`loader-left-line ${colorClassName}`} />
          <div className={`loader-middle-line ${colorClassName}`} />
          <div className={`loader-right-line ${colorClassName}`} />
        </div>
      </div>
    </div>
  );
}
