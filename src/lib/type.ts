export interface Login {
  email: string;
  password: string;
}
export interface Register extends Login {
  name: string;
}
export type blogTypes = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}[];
export interface blogForm {
  mainImage: string;
  otherImages: string[];
  id: string;
  title: string;
  content: string;
  decsription: string;
  thumbnail: string;
}
