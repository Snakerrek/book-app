import jwtDecode from "jwt-decode";
import {
  Post,
  PostTypes,
  TokenUserData,
  UserBookDetails,
  WrappedPost,
} from "./types";

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
  return levelTable[level];
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

export const getDateTime = (initialDate: Date) => {
  const date = new Date(initialDate);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${hour}:${minutes}, ${year}-${month}-${day}`;
};

export const wrapPostsWithType = (posts: Post[]): WrappedPost[] => {
  const wrappedPosts: WrappedPost[] = posts.map((post) => {
    let wrappedPost: WrappedPost = {
      post: post,
      type: PostTypes.DEFAULT,
    };
    if (post.shelfName) {
      wrappedPost.type = PostTypes.SHELVING;
    } else if (post.reviewText) {
      wrappedPost.type = PostTypes.REVIEW;
    } else if (post.starRating) {
      wrappedPost.type = PostTypes.STAR_RATING;
    } else if (post.followedUserID) {
      wrappedPost.type = PostTypes.FOLLOW;
    }
    return wrappedPost;
  });
  return wrappedPosts;
};
