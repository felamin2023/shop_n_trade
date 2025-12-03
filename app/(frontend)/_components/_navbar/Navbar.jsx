"use client";

import { usePathname } from "next/navigation";
import {
  Shirt,
  FolderOpenDot,
  CircleUserRound,
  List,
  House,
  LibraryBig,
  FileChartColumnIncreasing,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

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

  const isUserRoute =
    pathname === "/" ||
    pathname === "/user/project" ||
    pathname === "/user/profile" ||
    pathname === "/user/request";

  return (
    <>
      {pathname !== "/user/signin" &&
        pathname !== "/user/signup" &&
        pathname !== "/admin/signin" && (
          <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Bottom Navigation Container */}
            <div className="bg-[#fff]/95 backdrop-blur-xl border-t border-[#1a3d1a] shadow-2xl">
              {/* Decorative top line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>

              <div className="max-w-lg mx-auto px-2 py-2">
                <nav className="flex items-center justify-around">
                  {currentLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={i}
                        href={link.href}
                        className={`
                          relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl
                          transition-all duration-300 min-w-[70px]
                          ${
                            isActive
                              ? "text-white"
                              : "text-green-500/60 hover:text-green-400"
                          }
                        `}
                      >
                        {/* Active indicator background */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a5c1a]/50 to-[#1a5c1a]/20 rounded-2xl"></div>
                        )}

                        {/* Icon container */}
                        <div
                          className={`
                          relative p-2 rounded-xl transition-all duration-300
                          ${
                            isActive
                              ? "bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] shadow-lg shadow-green-900/50"
                              : "hover:bg-[#132d13]"
                          }
                        `}
                        >
                          <link.icon
                            size={20}
                            strokeWidth={isActive ? 2.5 : 2}
                          />

                          {/* Active dot indicator */}
                          {isActive && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          )}
                        </div>

                        {/* Label */}
                        <span
                          className={`
                          relative text-[10px] font-semibold tracking-wide
                          ${isActive ? "text-green-400" : ""}
                        `}
                        >
                          {link.name}
                        </span>
                      </Link>
                    );
                  })}

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl
                      text-red-400/70 hover:text-red-400 transition-all duration-300 min-w-[70px]"
                  >
                    <div className="p-2 rounded-xl hover:bg-red-500/10 transition-all duration-300">
                      <LogOut size={20} strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wide">
                      Logout
                    </span>
                  </button>
                </nav>
              </div>

              {/* Safe area for mobile devices */}
              <div className="h-safe-area-inset-bottom bg-[#0d2818]"></div>
            </div>
          </div>
        )}
    </>
  );
};

export default Navbar;
