export interface BasicBookType {
  _id?: string;
  title: string;
  cover: string;
  authors: string[];
  isbn: string;
}

export interface AdvancedBookType extends BasicBookType {
  description: string;
  pageCount: string;
  categories: string[];
}
