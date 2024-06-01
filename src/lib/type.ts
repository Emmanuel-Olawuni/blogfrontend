export interface Login {
  email: string;
  password: string;
}
export interface Register extends Login {
  name: string;
}
export type blogTypes = {
  id: number;
  title: string;
  description: string;
  thumbnail : string;

}
