"use client";
import { usePathname } from "next/navigation";
const Logout = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/user/signin" &&
        pathname !== "/user/signup" &&
        pathname !== "/admin/signin" && (
          <div className="flex items-center justify-end w-full h-fit pt-[15px] px-[20px] absolute">
            <a
              href="/user/signin"
              className="bg-black  py-[3px] px-[15px] rounded-[10px]"
            >
              Log out
            </a>
          </div>
        )}
    </>
  );
};

export default Logout;
