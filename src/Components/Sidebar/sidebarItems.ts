import { IconType } from "react-icons";
import { FaBeer } from "react-icons/fa";
import { FiBook } from "react-icons/fi";

const sidebarItems: {
  path: string;
  text: string;
  Icon: IconType;
  isLogo?: boolean;
}[] = [
  { path: "/", text: "BookApp", Icon: FiBook, isLogo: true },
  { path: "/", text: "Home", Icon: FaBeer },
  { path: "/bookList", text: "My books", Icon: FaBeer },
];

export default sidebarItems;
