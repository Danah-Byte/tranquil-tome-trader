import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthState = {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthCtx = createContext<AuthState | null>(null);
const KEY = "tranquil_admin_v1";

// Demo-only credentials — frontend prototype, not real security.
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "tranquil2025";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setIsAdmin(true);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      isAdmin,
      login: (username, password) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          setIsAdmin(true);
          try {
            localStorage.setItem(KEY, "1");
          } catch {
            // ignore
          }
          return true;
        }
        return false;
      },
      logout: () => {
        setIsAdmin(false);
        try {
          localStorage.removeItem(KEY);
        } catch {
          // ignore
        }
      },
    }),
    [isAdmin],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
