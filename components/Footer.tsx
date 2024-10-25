import { logOutAccoun } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter()
  const handleLogOut = async () => {
    
    const loggedOut = await logOutAccoun()
    if(loggedOut){
      router.push('/sign-in')
    }
  }
  return (
      <footer className="footer">
        <div
          className={type === "mobile" ? "footer_name-mobile" : "footer_name"}
        >
          {/* this ? is important because it just give the default value back when user is not render */}
          <p className="text-xl font-bold text-black-1">
            {user?.name[0] || "U"}
          </p>
        </div>
        <div
          className={
            type === "mobile" ? "footer_email-mobile" : "footer_email-mobile"
          }
        >
          <h1 className="text-14 truncate text-gray-700 font-semibold">
            {user?.name || "User not found"}
          </h1>
          <p className="text-14 truncate text-gray-600 font-normal">
            {user.email}
          </p>
        </div>
        <div className="footer_image">
          <Image src='/icons/logout.svg' fill alt="logout" onClick={handleLogOut}/>
        </div>
      </footer>

  );
};

export default Footer;
