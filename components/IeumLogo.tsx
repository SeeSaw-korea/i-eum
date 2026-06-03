
import React from 'react';

interface IeumLogoProps {
  className?: string;
  color?: string;
  height?: number;
}

const IeumLogo: React.FC<IeumLogoProps> = ({ className = '', color = '#1A2B16', height = 40 }) => {
  const vW = 148;
  const vH = 46;
  const w = height * (vW / vH);

  return (
    <svg
      viewBox={`0 0 ${vW} ${vH}`}
      width={w}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IEUM"
    >
      {/* "ieum" wordmark — Pretendard Light */}
      <text
        x="8"
        y="40"
        fontFamily="'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="300"
        fontSize="32"
        letterSpacing="-1.4"
        fill={color}
      >
        ieum
      </text>
      {/* Signature horizontal crossbar — the brand mark */}
      <rect x="0" y="29" width={vW} height="2" rx="1" fill={color} />
    </svg>
  );
};

export default IeumLogo;
