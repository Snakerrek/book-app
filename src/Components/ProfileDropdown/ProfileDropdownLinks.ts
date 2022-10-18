import { IconType } from "react-icons";
import { FaUserEdit, FaUserAlt } from "react-icons/fa";

type ProfileDropdownLinkType = {
  text: string;
  icon: IconType;
  link: string;
};

export const profileDropdownLinks: ProfileDropdownLinkType[] = [
  { text: "My profile", icon: FaUserAlt, link: "/profile" },
  { text: "Edit Profile", icon: FaUserEdit, link: "/editProfile" },
];
