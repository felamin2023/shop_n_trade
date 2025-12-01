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
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  const navlinks = [
    {
      name: "Product",
      href: "/",
      icon: Shirt,
    },
    {
      name: "Project",
      href: "/user/project",
      icon: FolderOpenDot,
    },
    {
      name: "Profile",
      href: "/user/profile",
      icon: CircleUserRound,
    },
    {
      name: "Request",
      href: "/user/request",
      icon: List,
    },
  ];

  const navLinkAdmin = [
    {
      name: "home",
      href: "/admin/home",
      icon: House,
    },
    {
      name: "inventory",
      href: "/admin/inventory",
      icon: LibraryBig,
    },
    {
      name: "transaction",
      href: "/admin/transaction",
      icon: FileChartColumnIncreasing,
    },
    {
      name: "project",
      href: "/admin/project",
      icon: FolderOpenDot,
    },
  ];

  return (
    <>
      {pathname !== "/user/signin" &&
        pathname !== "/user/signup" &&
        pathname !== "/admin/signin" && (
          <nav className="flex justify-center items-center absolute bottom-0 w-full">
            {pathname === "/" ||
            pathname === "/user/project" ||
            pathname === "/user/profile" ||
            pathname === "/user/request" ? (
              <ul className="flex justify-between items-center w-[60%]">
                {navlinks.map((link, i) => (
                  <li
                    className={`group bg-black hover:bg-white w-[100%] h-[30px]
                  ${i === 0 ? "rounded-tl-[50px]" : ""}
                  ${i === 3 ? "rounded-tr-[50px]" : ""}
                  ${pathname === link.href && "bg-white"}
                  flex justify-center items-center`}
                    key={i}
                  >
                    <Link
                      href={link.href}
                      className={`h-[100%] w-full flex justify-center items-center
                    ${i === 0 ? "rounded-tl-[50px]" : ""}
                    ${i === 3 ? "rounded-tr-[50px]" : ""}`}
                    >
                      <div className="group-hover:hidden">
                        {pathname === link.href ? (
                          <link.icon
                            size={18}
                            style={{
                              color:
                                pathname === link.href
                                  ? "black"
                                  : "transparent",
                            }}
                          />
                        ) : (
                          link.name
                        )}
                      </div>
                      <div className="hidden group-hover:flex">
                        <link.icon
                          size={18}
                          className={``}
                          style={{
                            color: "black",
                          }}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex justify-between items-center w-[60%]">
                {navLinkAdmin.map((link, i) => (
                  <li
                    className={`group bg-black hover:bg-white w-[100%] h-[30px]
                ${i === 0 ? "rounded-tl-[50px]" : ""}
                ${i === 3 ? "rounded-tr-[50px]" : ""}
                ${pathname === link.href && "bg-white"}
                flex justify-center items-center`}
                    key={i}
                  >
                    <Link
                      href={link.href}
                      className={`h-[100%] w-full flex justify-center items-center
                  ${i === 0 ? "rounded-tl-[50px]" : ""}
                  ${i === 3 ? "rounded-tr-[50px]" : ""}`}
                    >
                      <div className="group-hover:hidden">
                        {pathname === link.href ? (
                          <link.icon
                            size={18}
                            style={{
                              color:
                                pathname === link.href
                                  ? "black"
                                  : "transparent",
                            }}
                          />
                        ) : (
                          link.name
                        )}
                      </div>
                      <div className="hidden group-hover:flex">
                        <link.icon
                          size={18}
                          className={``}
                          style={{
                            color: "black",
                          }}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        )}
    </>
  );
};

export default Navbar;
