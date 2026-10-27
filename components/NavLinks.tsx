"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Close, Menu } from "./icons";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/website-performance", label: "Free guide" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="nav" aria-label="Main">
      {NAV.map((item) => (
        <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  // Close the menu after navigating
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details className="mobile-menu" ref={ref}>
      <summary className="icon-btn" aria-label="Open menu">
        <Menu className="icon-menu" />
        <Close className="icon-close" />
      </summary>
      <nav className="mobile-panel" aria-label="Main">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            onClick={() => {
              if (ref.current) ref.current.open = false;
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/products/website-performance-playbook" className="btn btn-primary">
          Get the Playbook
        </Link>
      </nav>
    </details>
  );
}
