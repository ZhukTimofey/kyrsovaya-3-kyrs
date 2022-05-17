export interface UserStore {
  id: string;
  email: string;
  name: string;
  password: string;
  surname: string;
  roles: string;
}
export interface Good {
  id: string;
  price: string;
  author: {
    id: string;
    email: string;
    name: string;
    password: string;
    surname: string;
    roles: "USER" | "MODERATOR";
  };
  buyers: {
    id: string;
    email: string;
    name: string;
    password: string;
    surname: string;
    roles: "USER" | "MODERATOR";
    message: string;
  }[];
  title: string;
  excerpt: string;
  img: string;
  status: "DRAFT" | "SOLD" | "REQUEST";
}
