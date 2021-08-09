import React from "react";

const WriteButton = () => {
  return (
    <svg
      width="135"
      height="135"
      viewBox="0 0 95 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M5 34C5 16.3269 19.3269 2 37 2C54.6731 2 69 16.3269 69 34C69 51.6731 54.6731 66 37 66C19.3269 66 5 51.6731 5 34Z"
          fill="#F05729"
        />
      </g>
      <path
        d="M44 22.3333L41.1836 25.1497L45.8503 29.8163L48.6667 26.9999L44 22.3333ZM39.4222 26.9111L26.5 39.8333V44.4999H31.1667L44.0889 31.5777L39.4222 26.9111Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="135"
          height="135"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.941176 0 0 0 0 0.341176 0 0 0 0 0.160784 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default WriteButton;
