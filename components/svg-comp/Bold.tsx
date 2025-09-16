import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const BoldSVG: React.FC<SVGComponentProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-bold"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
    <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
  </svg>
);

export default BoldSVG;