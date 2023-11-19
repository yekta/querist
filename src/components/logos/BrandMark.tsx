import { iconDefaultClassName } from "@components/icons/constants";

export default function IconBold({
  className = iconDefaultClassName,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.98 6.42 22 9.44l-1.4 1.4-3.02-3.03 1.4-1.4ZM17.58 5.02 14.56 2l-1.4 1.4 3.03 3.02 1.4-1.4ZM14.8 7.81 9.43 2.47l-1.4 1.39 5.36 5.35 1.4-1.4ZM8.74 7.35 5.72 4.33l-1.4 1.4 3.03 3.01 1.4-1.4ZM15.26 16.65l1.4-1.4 4.87 4.89-1.39 1.4-4.88-4.89ZM9.2 13.4 3.87 8.05l-1.4 1.4 5.35 5.34 1.4-1.4ZM9.2 16.19l1.4-1.4 5.35 5.35-1.4 1.4-5.34-5.35ZM6.42 16.19 3.4 13.16 2 14.56l3.02 3.02 1.4-1.4ZM6.42 18.98l1.4-1.4 3.02 3.02-1.4 1.4-3.02-3.02ZM14.8 10.6l1.39-1.4 5.34 5.36-1.39 1.4-5.35-5.36Z"
        fill="currentColor"
      />
    </svg>
  );
}
