import jwtDecode from "jwt-decode";
import { TokenUserData, UserBookDetails } from "./types";

export const getUserData = (): TokenUserData | null => {
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  if (token) {
    const user: TokenUserData = jwtDecode(token);
    return user;
  }
  return null;
};

export const getFavoriteCategory = (books: UserBookDetails[]) => {
  const categories: { categoryName: string; count: number }[] = [];
  books.forEach((book) => {
    book.bookDetails?.categories.forEach((category) => {
      const categoryIndex = categories.findIndex(
        (cat) => cat.categoryName === category
      );
      if (categoryIndex === -1) {
        categories.push({ categoryName: category, count: 1 });
      } else {
        categories[categoryIndex].count += 1;
      }
    });
  });
  let favoriteCategory = "";
  let maxCount = 0;
  console.log(categories);
  categories.forEach((category) => {
    if (category.count > maxCount) {
      favoriteCategory = category.categoryName;
      maxCount = category.count;
    }
  });
  return favoriteCategory;
};

// 1 read page = 1 xp
export const calculateReadPages = (books: UserBookDetails[]) => {
  const totalProgress = books.reduce((total, book) => total + book.progress, 0);
  return Math.floor(totalProgress);
};

// Each level require 100 xp more than previous (starting with 100xp for level 1)
export const getLevelTable = () => {
  const levelTable = [];
  for (let i = 1; i <= 100; i++) {
    levelTable.push(i * 100);
  }
  return levelTable;
};

export const getXpRequired = (level: number) => {
  const levelTable = getLevelTable();
  return levelTable[level - 1];
};

// Calculate user level based on xp with levelTable
export const calculateUserLevel = (books: UserBookDetails[]) => {
  const levelTable = getLevelTable();
  let xp = calculateReadPages(books);
  let i = 0;
  while (xp - levelTable[i] > 0) {
    xp -= levelTable[i];
    i++;
  }
  return { lvl: i, xpLeft: xp };
};
