import { iconDefaultClassName } from "@components/icons/constants";

export default function IconSchema({
  className = iconDefaultClassName,
  ...rest
}: React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...rest}
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 16v-2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v2M5 16H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5Zm14 0h-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1Zm-7 0V8m0 8h-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1Zm0-8h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
