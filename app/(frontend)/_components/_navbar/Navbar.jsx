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
    { name: "Rewards", href: "/", icon: Shirt },
    { name: "Projects", href: "/user/project", icon: FolderOpenDot },
    { name: "Profile", href: "/user/profile", icon: CircleUserRound },
    { name: "Requests", href: "/user/request", icon: List },
  ];

  const navLinkAdmin = [
    { name: "Home", href: "/admin/home", icon: House },
    { name: "Inventory", href: "/admin/inventory", icon: LibraryBig },
    {
      name: "Transactions",
      href: "/admin/transaction",
      icon: FileChartColumnIncreasing,
    },
    { name: "Projects", href: "/admin/project", icon: FolderOpenDot },
  ];

  const currentLinks =
    pathname === "/" ||
    pathname === "/user/project" ||
    pathname === "/user/profile" ||
    pathname === "/user/request"
      ? navlinks
      : navLinkAdmin;

  const shouldShowNavbar =
    pathname !== "/user/signin" &&
    pathname !== "/user/signup" &&
    pathname !== "/admin/signin";

  if (!shouldShowNavbar) return null;

  return (
    <>
      <div className="fixed bottom-2 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-[#1a2f22] rounded-full px-4 py-2 flex items-center w-full max-w-xl shadow-lg">
          {currentLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={i}
                href={link.href}
                className={`group relative flex-1 flex items-center justify-center h-9 rounded-full transition-all duration-300
                  ${
                    isActive
                      ? "bg-green-500 hover:bg-transparent text-white hover:text-green-400"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                <link.icon
                  size={18}
                  strokeWidth={2}
                  className={`absolute transition-all duration-300 ${
                    isActive
                      ? "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                      : "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75"
                  }`}
                />
                <span
                  className={`text-xs font-medium absolute transition-all duration-300 ${
                    isActive
                      ? "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75"
                      : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="group relative flex-1 flex items-center justify-center h-10 rounded-full text-gray-400 hover:text-red-400 transition-all duration-300"
          >
            <LogOut
              size={18}
              strokeWidth={2}
              className="absolute transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75"
            />
            <span className="text-xs font-medium absolute transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
              Logout
            </span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
