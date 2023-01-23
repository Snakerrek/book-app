export interface BasicBookType {
  _id?: string;
  title: string;
  cover: string;
  authors: string[];
  isbn: string;
}

export interface ReviewAuthorDetails {
  authorID: string;
  authorName: string;
  authorAvatar: string;
}

export interface Review {
  author: ReviewAuthorDetails;
  starRating: string;
  review: string;
}

export interface AdvancedBookType extends BasicBookType {
  description: string;
  pageCount: string;
  categories: string[];
  publisher: string;
  publishedDate: string;
  reviews: Review[];
}

export interface TokenUserData {
  id: string;
  userName: string;
}

export interface ReviewData {
  starRatingAvg: number;
  starRatingsCount: number;
  reviewsCount: number;
  thisUserReview?: Review;
}

export interface UserBookDetails {
  bookId: string;
  progress: number;
  shelf: string;
  bookDetails?: AdvancedBookType;
}

export interface BasicUserData {
  _id: string;
  avatar: string;
  username: string;
}

export interface UserData extends BasicUserData {
  email: string;
  books: UserBookDetails[];
  followers: BasicUserData[];
  following: BasicUserData[];
}

export interface Shelf {
  name: string;
  books: UserBookDetails[];
}

export enum ShelfNames {
  CURRENTLY_READING = "Aktualnie czytam",
  WANT_TO_READ = "Chcę przeczytać",
  READ = "Przeczytane",
}

export interface Avatar {
  name: string;
  url: string;
  isAvailable: boolean;
  isChoosen?: boolean;
}

export interface GenreType {
  value: string;
  label: string;
}

export interface Post {
  author: BasicUserData;
  _id: string;
  datetime: Date;
  bookID?: string;
  book?: BasicBookType;
  followedUser?: BasicUserData;
  reviewText?: string;
  starRating?: number;
  shelfName?: string;
  followedUserID?: string;
}

export interface WrappedPost {
  post: Post;
  type: PostTypes;
}

export enum PostTypes {
  SHELVING,
  REVIEW,
  STAR_RATING,
  FOLLOW,
  DEFAULT,
}
