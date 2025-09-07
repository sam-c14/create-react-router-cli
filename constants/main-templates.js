const constantsConfigTemplate = `export const SUPPORTED_LANGUAGES = ["en", "fr", "es"];\n`;

const authConfigTemplate = `
    export const authConfig = {
        tokenStorageKey: "access_token",
        refreshTokenKey: "refresh_token",
        sessionTimeout: 3600, // in seconds
    };\n`;

const loginTemplate = `
import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Login
        </h2>

        <form className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-xs text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
`;

const useLoginHookTemplate = `
import { useState } from "react";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    validate,
  };
};
`;

const sharedProvidersTemplate = `
import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
`;

const layoutTemplate = `
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">MyApp</h1>
          <nav className="space-x-4 text-sm text-gray-600">
            <a href="#" className="hover:text-indigo-600">Home</a>
            <a href="#" className="hover:text-indigo-600">About</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-white border-t mt-6">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Your company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
`;

const homePageTemplate = `
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Welcome to Your App
        </h1>
        <p className="text-lg text-gray-600">
          A minimalistic starting point for your project.  
          Clean, responsive, and easy to extend.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
`

export {
  constantsConfigTemplate,
  authConfigTemplate,
  loginTemplate,
  useLoginHookTemplate,
  sharedProvidersTemplate,
  layoutTemplate,
  homePageTemplate
};
