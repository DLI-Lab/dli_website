"use client";

import { useEffect, useState } from "react";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  {
    href: "/research",
    label: "Research",
    children: [
      { href: "/research", label: "Research Areas" },
      { href: "/demo", label: "Demo" },
    ],
  },
  { href: "/publications", label: "Publications" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/apply", label: "Apply" },
];

// Flatten for mobile: parent + its children rendered as siblings.
// If a child links to the same href as the parent, drop the parent to avoid duplicates.
const flatMobileItems = navItems.flatMap((item) => {
  if (!item.children) return [item];
  const hasParentDup = item.children.some((c) => c.href === item.href);
  return hasParentDup ? item.children : [item, ...item.children];
});

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close menu on route navigation (best-effort for <a> navigation)
  useEffect(() => {
    const onPopState = () => setOpen(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-8 lg:px-12 h-16 md:h-20 lg:h-24">
        {/* Logo */}
        <a
          href="/"
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 shrink-0 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
        >
          DLI Lab
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex self-stretch items-stretch gap-6 lg:gap-8 text-base lg:text-xl">
          {navItems.map((item) => (
            <li key={item.href} className="relative group flex items-center">
              <a
                href={item.href}
                className="inline-flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
                {item.children && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-blue-600"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </a>

              {item.children && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150">
                  <ul className="min-w-[9rem] bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="block whitespace-nowrap px-5 py-2.5 text-sm lg:text-base text-gray-700 hover:bg-blue-50/60 hover:text-blue-600 transition-colors"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-6 py-3">
            <ul className="flex flex-col gap-2">
              {flatMobileItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
