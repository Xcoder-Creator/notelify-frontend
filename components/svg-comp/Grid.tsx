import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const GridSVG: React.FC<SVGComponentProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M3.5 3.5H10.5V10.5H3.5V3.5Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 13.5H10.5V20.5H3.5V13.5Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 3.5H20.5V10.5H13.5V3.5Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 13.5H20.5V20.5H13.5V13.5Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default GridSVG;