"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Shirt,
  FolderOpenDot,
  CircleUserRound,
  List,
  House,
  LibraryBig,
  FileChartColumnIncreasing,
  Leaf,
  LogOut,
  Recycle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const navlinks = [
    {
      name: "Rewards",
      href: "/",
      icon: Shirt,
    },
    {
      name: "Projects",
      href: "/user/project",
      icon: FolderOpenDot,
    },
    {
      name: "Profile",
      href: "/user/profile",
      icon: CircleUserRound,
    },
    {
      name: "Requests",
      href: "/user/request",
      icon: List,
    },
  ];

  const navLinkAdmin = [
    {
      name: "Home",
      href: "/admin/home",
      icon: House,
    },
    {
      name: "Inventory",
      href: "/admin/inventory",
      icon: LibraryBig,
    },
    {
      name: "Transactions",
      href: "/admin/transaction",
      icon: FileChartColumnIncreasing,
    },
    {
      name: "Projects",
      href: "/admin/project",
      icon: FolderOpenDot,
    },
  ];

  const currentLinks =
    pathname === "/" ||
    pathname === "/user/project" ||
    pathname === "/user/profile" ||
    pathname === "/user/request"
      ? navlinks
      : navLinkAdmin;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {pathname !== "/user/signin" &&
        pathname !== "/user/signup" &&
        pathname !== "/admin/signin" && (
          <div ref={menuRef} className="fixed top-4 right-4 z-50">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                relative flex items-center justify-center w-12 h-12 rounded-2xl
                bg-white/80 backdrop-blur-lg shadow-lg border border-emerald-100
                hover:shadow-xl transition-all duration-300
                ${isOpen ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-transparent" : "hover:border-emerald-300"}
              `}
            >
              {isOpen ? (
                <X size={22} className="text-white" />
              ) : (
                <Menu size={22} className="text-emerald-700" />
              )}
              
              {/* Notification dot */}
              {!isOpen && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            <div
              className={`
                absolute top-16 right-0 w-64 
                bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100
                transform transition-all duration-300 origin-top-right
                ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
              `}
            >
              {/* Header */}
              <div className="p-4 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl shadow-md">
                    <Recycle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-noto text-emerald-800 font-bold text-base">
                      Shop & Trade
                    </h3>
                    <p className="text-emerald-600 text-xs">Recycle. Reward. Repeat.</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold text-emerald-500 uppercase tracking-wider">
                  Navigation
                </p>
                <ul className="space-y-1">
                  {currentLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl
                            font-medium text-sm transition-all duration-200
                            ${
                              isActive
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                                : "text-emerald-700 hover:bg-emerald-50"
                            }
                          `}
                        >
                          <link.icon size={18} />
                          <span>{link.name}</span>
                          {isActive && (
                            <Leaf size={14} className="ml-auto" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Logout Section */}
              <div className="p-2 border-t border-emerald-100">
                <Link
                  href="/user/signin"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                    text-red-600 hover:bg-red-50 font-medium text-sm
                    transition-all duration-200 group"
                >
                  <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>Log out</span>
                </Link>
              </div>

              {/* Footer */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-b-3xl">
                <p className="text-center text-xs text-emerald-600">
                  🌱 Making the world greener!
                </p>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Navbar;
