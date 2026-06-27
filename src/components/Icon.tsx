import type { SVGProps } from "react";

type IconName =
  | "car" | "key" | "shield" | "doc" | "satellite" | "users" | "flame"
  | "heart" | "window" | "plus" | "swap" | "refresh" | "ship" | "plate"
  | "check" | "fence" | "gauge" | "power" | "chart" | "lock" | "phone"
  | "mail" | "pin" | "clock" | "star" | "arrow" | "menu" | "close"
  | "fuel" | "gear" | "seat" | "calendar" | "truck" | "logout";

const paths: Record<IconName, React.ReactNode> = {
  car: <path d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v5h2m12-5v5h-2m-10 0v1m10-1v1M7 16h.01M17 16h.01" />,
  key: <path d="M15 7a4 4 0 11-4 4m4-4l5 5m-2-2l2 2-2 2m-7-3a4 4 0 100 .01" />,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
  doc: <path d="M7 3h7l4 4v14H7zM14 3v4h4M9 13h6M9 17h6" />,
  satellite: <path d="M5 19l4-4m-2-6l3 3m4-9l4 4-3 3-4-4zM3 21a6 6 0 006-6" />,
  users: <path d="M9 11a3 3 0 100-6 3 3 0 000 6zm7 0a3 3 0 100-6M3 20a6 6 0 0112 0m1 0a6 6 0 015-3" />,
  flame: <path d="M12 3c1 4-3 5-3 9a3 3 0 006 0c0-2-1-3-1-3 2 1 3 3 3 5a5 5 0 11-10 0c0-5 5-7 5-11z" />,
  heart: <path d="M12 20l-7-7a4 4 0 016-5l1 1 1-1a4 4 0 016 5z" />,
  window: <path d="M4 5h16v14H4zM4 9h16M9 9v10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  swap: <path d="M7 7h11l-3-3m3 3l-3 3M17 17H6l3-3m-3 3l3 3" />,
  refresh: <path d="M4 4v5h5M20 20v-5h-5M5 9a7 7 0 0112-3l2 2M19 15a7 7 0 01-12 3l-2-2" />,
  ship: <path d="M3 16l9-4 9 4-2 5H5zM12 4v8M9 8h6" />,
  plate: <path d="M3 7h18v10H3zM7 11h2M11 11h2M15 11h2" />,
  check: <path d="M5 12l5 5 9-11" />,
  fence: <path d="M5 21V8l3-3 3 3v13M13 21V8l3-3 3 3v13M3 12h18M3 16h18" />,
  gauge: <path d="M12 14l4-4M3 18a9 9 0 1118 0M12 14a2 2 0 100 .01" />,
  power: <path d="M12 4v8M7 7a7 7 0 1010 0" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  lock: <path d="M6 11V8a6 6 0 0112 0v3M5 11h14v9H5zM12 15v2" />,
  phone: <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  pin: <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 10a1 1 0 100 .01" />,
  clock: <path d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z" />,
  star: <path d="M12 3l2.9 6 6.1.9-4.5 4.3 1 6.1-5.5-3-5.5 3 1-6.1L3 9.9 9.1 9z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  fuel: <path d="M5 21V5a2 2 0 012-2h6a2 2 0 012 2v16M3 21h12M15 8h2a2 2 0 012 2v6a2 2 0 002 0v-6L18 6" />,
  gear: <path d="M12 15a3 3 0 100-6 3 3 0 000 6zM4 12l-1 2 2 2 2-1m6 4l1 2h2l1-2m4-7l1-2-2-2-2 1M8 5L7 3H5L4 5" />,
  seat: <path d="M6 19v-7a3 3 0 013-3h3l3 6h2a2 2 0 010 4H6zM6 19H4M18 19h2" />,
  calendar: <path d="M4 6h16v15H4zM4 10h16M8 3v4M16 3v4" />,
  truck: <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7M6 19a2 2 0 100-.01M18 19a2 2 0 100-.01" />,
  logout: <path d="M15 4h4v16h-4M11 8l-4 4 4 4M3 12h8" />,
};

export default function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={24}
      height={24}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
