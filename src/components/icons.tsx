import type { SVGProps } from "react";

export type IconName =
  | "brand"
  | "home"
  | "calculator"
  | "equation"
  | "quadratic"
  | "statistics"
  | "matrix"
  | "converter"
  | "percentage"
  | "graph"
  | "calculus"
  | "complex"
  | "vector"
  | "finance"
  | "settings"
  | "search"
  | "menu"
  | "sun"
  | "moon"
  | "close"
  | "backspace"
  | "check"
  | "trash"
  | "reset"
  | "arrow-right"
  | "info";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export default function Icon({ name, size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={props["aria-label"] ? undefined : true}
      focusable="false"
      {...props}
    >
      {name === "brand" && (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" stroke="none" />
          <path d="M7 7h3l4.8 6V7H18v10h-3l-5-6v6H7Z" fill="white" stroke="none" />
        </>
      )}
      {name === "home" && (
        <>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </>
      )}
      {name === "calculator" && (
        <>
          <rect x="5" y="2.8" width="14" height="18.4" rx="2.2" />
          <rect x="8" y="5.7" width="8" height="3.1" rx="0.7" />
          <path d="M8 12h2M14 12h2M8 15.7h2M14 15.7h2M8 19.2h2M14 19.2h2" />
        </>
      )}
      {name === "equation" && (
        <>
          <path d="M4 7h5M4 12h5M4 17h5" />
          <path d="M14 6l5 6-5 6" />
          <path d="M12 4v16" />
        </>
      )}
      {name === "quadratic" && (
        <>
          <path d="M4 17c3-7 5-10 8-10s5 3 8 10" />
          <path d="M4 20h16" />
          <path d="M7 4h10" />
        </>
      )}
      {name === "statistics" && (
        <>
          <path d="M4 20V10" />
          <path d="M10 20V6" />
          <path d="M16 20v-8" />
          <path d="M22 20V3" />
        </>
      )}
      {name === "matrix" && (
        <>
          <path d="M7 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2" />
          <path d="M17 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2" />
          <path d="M8 9h8M8 15h8" />
        </>
      )}
      {name === "converter" && (
        <>
          <path d="M4 7h13" />
          <path d="m14 4 3 3-3 3" />
          <path d="M20 17H7" />
          <path d="m10 14-3 3 3 3" />
        </>
      )}
      {name === "percentage" && (
        <>
          <path d="M7 17 17 7" />
          <circle cx="7" cy="7" r="2.2" />
          <circle cx="17" cy="17" r="2.2" />
        </>
      )}
      {name === "graph" && (
        <>
          <path d="M4 20V5" />
          <path d="M4 20h16" />
          <path d="m7 15 4-5 3 3 6-8" />
        </>
      )}
      {name === "calculus" && (
        <>
          <path d="M8 4c-3 0-4 3-2 5 2 2 6 3 5 7-.5 2-2 4-5 4" />
          <path d="M15 4c3 0 4 3 2 5-2 2-6 3-5 7.5" />
        </>
      )}
      {name === "complex" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M8.5 15.5c1.5-2.5 2.2-5 2.2-7.2M14 9.5h.01M15.5 14h.01" />
        </>
      )}
      {name === "vector" && (
        <>
          <path d="M5 19 19 5" />
          <path d="m14 5h5v5" />
          <path d="M5 5v5M5 5h5M5 19h5M5 19v-5" />
        </>
      )}
      {name === "finance" && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.8 8.7c-.7-.7-1.7-1-2.8-1-1.6 0-2.8.8-2.8 2 0 3.2 5.6 1.2 5.6 4.2 0 1.2-1.2 2-2.8 2-1.1 0-2.2-.3-2.9-1" />
          <path d="M12 6v12" />
        </>
      )}
      {name === "settings" && (
        <>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-1.9 1.9-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.7v.2h-2.7v-.2a1.8 1.8 0 0 0-1.1-1.7 1.8 1.8 0 0 0-2 .4l-.1.1-1.9-1.9.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.7-1.1h-.2v-2.7h.2A1.8 1.8 0 0 0 7.5 10a1.8 1.8 0 0 0-.4-2l-.1-.1 1.9-1.9.1.1a1.8 1.8 0 0 0 2 .4 1.8 1.8 0 0 0 1.1-1.7v-.2h2.7v.2A1.8 1.8 0 0 0 16 6.5a1.8 1.8 0 0 0 2-.4l.1-.1L20 7.9l-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.7 1.1h.2v2.7h-.2a1.8 1.8 0 0 0-1.8 1.2Z" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="10.8" cy="10.8" r="6.4" />
          <path d="m16 16 5 5" />
        </>
      )}
      {name === "menu" && <path d="M4 6h16M4 12h16M4 18h16" />}
      {name === "sun" && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      )}
      {name === "moon" && <path d="M20 15.5A8.5 8.5 0 1 1 8.5 4 7.5 7.5 0 0 0 20 15.5Z" />}
      {name === "close" && <path d="m6 6 12 12M18 6 6 18" />}
      {name === "backspace" && (
        <>
          <path d="M20 5H9L3.5 12 9 19h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" />
          <path d="m11 9 5 6M16 9l-5 6" />
        </>
      )}
      {name === "check" && <path d="m5 12 4 4L19 6" />}
      {name === "trash" && (
        <>
          <path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13" />
          <path d="M10 11v5M14 11v5" />
        </>
      )}
      {name === "reset" && (
        <path d="M20 11a8 8 0 0 0-14.8-4L3 10m0 0V4m0 6h6M4 13a8 8 0 0 0 14.8 4L21 14m0 0v6m0-6h-6" />
      )}
      {name === "arrow-right" && <path d="M4 12h15M13 6l6 6-6 6" />}
      {name === "info" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </>
      )}
    </svg>
  );
}
