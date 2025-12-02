"use client";
import { usePathname } from "next/navigation";

const Logout = () => {
  const pathname = usePathname();
  
  // This component is now empty since logout moved to Navbar
  // Keeping it for potential future use (e.g., top header content)
  return null;
};

export default Logout;
