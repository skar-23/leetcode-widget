import type { SVGProps } from 'react';

export function LeetCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 9.5 8 12l2 2.5" />
      <path d="M14 9.5 16 12l-2 2.5" />
    </svg>
  );
}
