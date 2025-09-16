import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const LetterCaseSVG: React.FC<SVGComponentProps> = (props) => (
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
    className="icon icon-tabler icons-tabler-outline icon-tabler-letter-case"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M17.5 15.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
    <path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" />
    <path d="M3 13h7" />
    <path d="M21 12v7" />
  </svg>
);

export default LetterCaseSVG;