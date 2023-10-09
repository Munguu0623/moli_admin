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
export type User = {
  id: string;
  email: string;
  name?: string;
  password?: string; // It's often a good idea not to expose passwords, even in types.
};