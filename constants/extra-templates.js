const buttonElement = `
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={\`\${baseStyles} \${variants[variant]} \${
      disabled ? disabledStyles : ""
    } \${className}\`}
  >
    {children}
  </button>
`;

const buttonTemplate = `
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: Readonly<ButtonProps>) {
  const baseStyles =
    "px-7 py-3 rounded-lg text-sm cursor-pointer font-medium focus:outline-none focus:ring-2 transition";

  const variants: Record<typeof variant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    ${buttonElement}
  );
}
`;

const drawerTemplate = `
import { type ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "left" | "right";
};

export default function Drawer({
  open,
  onClose,
  children,
  position = "right",
}: Readonly<DrawerProps>) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <button
          aria-label="drawer-Overlay"
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={\`fixed top-0 \${position}-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 \${
          open ? "translate-x-0" : position === "right" ? "translate-x-full" : "-translate-x-full"
        }\`}
      >
        <button
          aria-label="Close Drawer"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Drawer Content */}
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}

`;

const utilsTemplate = `
function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function joinClassNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export { formatDate, joinClassNames };
`;

const iconsTemplate = `
import React from "react";

interface Props {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  title?: string;
};

export function IconSearch({
  size = 24,
  strokeWidth = 2,
  className,
  title,
}: Readonly<Props>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
`;

const indexIconTemplate = `
export * from "./magnifying-glass";
`;

const indexHtmlTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Create Feature Router App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

module.exports = {
  buttonTemplate,
  drawerTemplate,
  utilsTemplate,
  iconsTemplate,
  indexIconTemplate,
  indexHtmlTemplate
};
