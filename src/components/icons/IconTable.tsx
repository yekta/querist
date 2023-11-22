import { iconDefaultClassName } from "@components/icons/constants";

export default function IconTable({
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
        d="M8.5 3H5a2 2 0 0 0-2 2v4m5.5-6H19a2 2 0 0 1 2 2v4M8.5 3v18m0 0H19a2 2 0 0 0 2-2v-4M8.5 21H5a2 2 0 0 1-2-2v-4m0-6h18M3 9v6m18-6v6M3 15h18"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
