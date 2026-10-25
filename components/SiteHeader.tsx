import Link from "next/link";
import { SITE } from "@/lib/site";
import { DesktopNav, MobileNav } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${SITE.name}, home`}>
          <span className="brand-mark" aria-hidden="true">
            SS
          </span>
          {SITE.name}
        </Link>
        <DesktopNav />
        <div className="header-actions">
          <ThemeToggle />
          <Link href="/products/website-performance-playbook" className="btn btn-primary header-cta">
            Get the Playbook
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
