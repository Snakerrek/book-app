import { IconType } from "react-icons";
import { HiHome, HiUsers } from "react-icons/hi";
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
  { path: "/", text: "Strona główna", Icon: HiHome },
  { path: "/bookSearch", text: "Przeglądaj książki", Icon: IoIosBookmarks },
  { path: "/userList", text: "Użytkownicy", Icon: HiUsers },
  { path: "/profile", text: "Mój profil", Icon: FaUserAlt },
  { path: "/editProfile", text: "Edytuj profil", Icon: FaUserEdit },
  { path: "/bookList", text: "Moje książki", Icon: SiBookstack },
];

export default sidebarItems;
