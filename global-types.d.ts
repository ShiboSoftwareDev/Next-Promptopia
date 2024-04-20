import { DefaultSession } from "next-auth";
import { Profile } from "next-auth";

export interface Post {
  prompt: string;
  tag: string;
  _id?: string;
  creator?: {
    image: string;
    username: string;
    email: string;
    _id: string;
  };
}

export interface URLParams {
  params: {
    id: string;
  };
}

export interface CustomSession extends DefaultSession {
  id: string;
}

export interface CustomProfile extends Profile {
  picture: string;
}
