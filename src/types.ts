export interface BasicBookType {
  _id?: string;
  title: string;
  cover: string;
  authors: string[];
  isbn: string;
}

export interface Review {
  authorID: string;
  starRating: string;
  reviewText: string;
}

export interface AdvancedBookType extends BasicBookType {
  description: string;
  pageCount: string;
  categories: string[];
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
