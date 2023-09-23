export type IDType = string | number;

export interface IBlog {
  ID: IDType;
  BlodTitle: string;
  BlogDescription: string;
}

export interface IBlogs {
  title: string;
  content: string;
}
