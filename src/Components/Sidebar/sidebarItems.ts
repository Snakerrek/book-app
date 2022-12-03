import { IconType } from "react-icons";
import { HiHome } from "react-icons/hi";
import { FiBook } from "react-icons/fi";
import { FaUserEdit, FaUserAlt } from "react-icons/fa";
import { IoIosBookmarks } from "react-icons/io";
import { SiBookstack } from "react-icons/si";

const sidebarItems: {
  path: string;
  text: string;
  Icon: IconType;
  isLogo?: boolean;
}[] = [
  { path: "/", text: "BookApp", Icon: FiBook, isLogo: true },
  { path: "/", text: "Home", Icon: HiHome },
  { path: "/bookSearch", text: "Browse Books", Icon: IoIosBookmarks },
  { path: "/profile", text: "My Profile", Icon: FaUserAlt },
  { path: "/editProfile", text: "Edit Profile", Icon: FaUserEdit },
  { path: "/bookList", text: "My books", Icon: SiBookstack },
];

export default sidebarItems;
