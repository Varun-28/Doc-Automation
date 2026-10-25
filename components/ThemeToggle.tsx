"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "./icons";

// Runs in <head> before first paint: saved choice, else the OS setting.
export const THEME_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",t)}catch(e){d.setAttribute("data-theme","light")}})()`;

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  // React's dev-mode remount resets <html> attributes; put them back.
  // In production this is a no-op because the head script already ran.
  useLayoutEffect(() => {
    const d = document.documentElement;
    if (d.hasAttribute("data-theme")) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    d.setAttribute("data-theme", saved === "light" || saved === "dark" ? saved : prefersDark ? "dark" : "light");
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  }

  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle} aria-label="Switch between light and dark theme">
      <Sun className="icon-sun" />
      <Moon className="icon-moon" />
    </button>
  );
}
