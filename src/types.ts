export interface BasicBookType {
  _id: string;
  title: string;
  cover: string;
  authors: string[];
}

export interface AdvancedBookType extends BasicBookType {
  description: string;
  isbn: number;
  pageCount: number;
  categories: string[];
}
