export interface BasicBookType {
  _id: string;
  title: string;
  cover: string;
  authors: string[];
  isbn: number;
}

export interface AdvancedBookType extends BasicBookType {
  description: string;
  pageCount: number;
  categories: string[];
}
