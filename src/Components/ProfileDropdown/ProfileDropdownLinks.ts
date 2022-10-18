import { IconType } from "react-icons";
import { FaUserEdit, FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

type ProfileDropdownLinkType = {
  text: string;
  icon: IconType;
  link: string;
};

export const profileDropdownLinks: ProfileDropdownLinkType[] = [
  { text: "My profile", icon: FaUserAlt, link: "/profile" },
  { text: "Edit Profile", icon: FaUserEdit, link: "/editProfile" },
  { text: "Logout", icon: RiLogoutCircleRLine, link: "/logout" },
];
