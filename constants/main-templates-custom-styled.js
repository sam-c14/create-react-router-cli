const layoutCustomTemplate = `
import { Outlet, NavLink } from "react-router";

export default function Layout() {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="layout-header-inner">
          <NavLink to="/" className="layout-logo">MyApp</NavLink>
          <nav className="layout-nav">
            <NavLink to="/" className="layout-nav-link">Home</NavLink>
            <NavLink to="/auth/login" className="layout-nav-link">Login</NavLink>
            <NavLink to="https://github.com/sam-c14/create-react-router-cli.git" className="layout-nav-link">About</NavLink>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <div className="layout-footer-inner">
          © {new Date().getFullYear()} Your company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
`;

const homePageCustomTemplate = `
import Button from "../../ui/button/button";

export default function Home() {
  const goToRepo = () =>
    window.open(
      "https://github.com/sam-c14/create-react-router-cli.git",
      "_blank"
    );

  return (
    <main className="home-container">
      <div className="home-inner">
        <h1 className="home-title">Welcome 👋</h1>
        <p className="home-subtitle">
          A minimalistic starting point for your project. Clean, responsive, and
          easy to extend.
        </p>

        <div className="home-actions">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary" onClick={goToRepo}>
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
}
`;

const loginCustomTemplate = `
import React from "react";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form className="login-form">
          <div>
            <input type="email" placeholder="Email" className="login-input" />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="login-input"
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <a href="#" className="login-footer-link">Sign up</a>
        </p>
      </div>
    </div>
  );
}
`;

const buttonElement = `
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={\`btn \${variantClass} \${disabled ? "btn-disabled" : ""} \${className}\`}
  >
    {children}
  </button>
`;

const buttonCustomTemplate = `
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
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
      ? "btn-secondary"
      : "btn-danger";

  return (
    ${buttonElement}
  );
}
`;

const drawerCustomTemplate = `
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
          className="drawer-overlay"
          onClick={onClose}
        />
      )}

      <div
        className={\`drawer drawer-\${position} \${open ? "drawer-open" : ""}\`}
      >
        <button
          aria-label="Close Drawer"
          className="drawer-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Drawer Content */}
        <div className="drawer-content">{children}</div>
      </div>
    </>
  );
}
`;

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

body{
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}

.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

.layout-header {
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.layout-header-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layout-logo {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e40af;
  text-decoration: none;
}

.layout-nav {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.layout-nav-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s, transform 0.2s;
}
.layout-nav-link:hover {
  color: #4f46e5;
  transform: scale(1.05);
}

.layout-main {
  flex: 1;
  width: 100%;
  margin: 0 auto;
}

.layout-footer {
  background-color: #ffffff;
  border-top: 1px solid #f3f4f6;
  padding-top: 0.75rem;
  padding-bottom: 0.5rem;
}

.layout-footer-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.home-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #eff6ff, #ffffff, #eef2ff);
  padding: 1.5rem;
}

.home-inner {
  max-width: 42rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.home-title {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #111827;
}
@media (min-width: 640px) {
  .home-title {
    font-size: 3rem;
  }
}

.home-subtitle {
  font-size: 1.125rem;
  color: #4b5563;
}

.home-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

/* Login */
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
}

.login-card {
  width: 100%;
  max-width: 24rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.login-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
}

.login-form {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
}
.login-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #6366f1;
}

.login-button {
  width: 100%;
  background-color: #4f46e5;
  color: #ffffff;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}
.login-button:hover {
  background-color: #4338ca;
}
.login-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #6366f1;
}

.login-footer {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #4b5563;
  text-align: center;
}

.login-footer-link {
  color: #4f46e5;
  text-decoration: none;
}
.login-footer-link:hover {
  text-decoration: underline;
}

.btn {
  padding: 0.75rem 1.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
}

.btn:focus {
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.8);
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
}
.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #e5e7eb; 
  color: #374151; 
}
.btn-secondary:hover {
  background-color: #d1d5db; 
}
.btn-secondary:focus {
  box-shadow: 0 0 0 2px #9ca3af;
}

.btn-danger {
  background-color: #dc2626;
  color: #ffffff;
}
.btn-danger:hover {
  background-color: #b91c1c;
}
.btn-danger:focus {
  box-shadow: 0 0 0 2px #ef4444;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 40;
}

.drawer {
  position: fixed;
  top: 0;
  height: 100%;
  width: 16rem; /* w-64 */
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 50;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.drawer-left {
  left: 0;
  transform: translateX(-100%);
}
.drawer-right {
  right: 0;
}

.drawer-open.drawer-left {
  transform: translateX(0);
}
.drawer-open.drawer-right {
  transform: translateX(0);
}

.drawer-close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: #4b5563;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s;
}
.drawer-close-btn:hover {
  color: #1f2937;
}

.drawer-content {
  padding: 1rem;
}
`;

export {
  homePageCustomTemplate,
  layoutCustomTemplate,
  loginCustomTemplate,
  buttonCustomTemplate,
  drawerCustomTemplate,
  styles,
};
