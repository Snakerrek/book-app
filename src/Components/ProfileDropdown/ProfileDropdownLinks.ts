import { IconType } from "react-icons";
import { FaUserEdit, FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";

type ProfileDropdownLinkType = {
  text: string;
  icon: IconType;
  link: string;
};

export const profileDropdownLinks: ProfileDropdownLinkType[] = [
  { text: "Mój profil", icon: FaUserAlt, link: "/profile" },
  { text: "Moje książki", icon: SiBookstack, link: "/bookList" },
  { text: "Edytuj profil", icon: FaUserEdit, link: "/editProfile" },
  { text: "Wyloguj", icon: RiLogoutCircleRLine, link: "/logout" },
];
