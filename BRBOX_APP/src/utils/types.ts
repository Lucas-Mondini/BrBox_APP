export type Game = {
  title: string;
  year: number;
  tag1: string;
  tag2: string;
  moreTags: number;
  id: number;
  evaluations: number;
}

export type User = {
  id: number;
  username: string;
  email: string;
  admin: boolean;
  auth_token: string;
}

export type Params = {
  id: number | null;
  new: boolean | null;
}

export type Evaluation = {
  user_ID: string;
  paid: boolean;
  participated: boolean;
}

export type ImageType = {
  id?: number;
  name: string;
  link: string;
}

export type LinkType = {
  id: number;
  link: string;
}

export type Tag = {
  id: number;
  name: string;
  description?: string;
}

export type Platform = {
  id: number;
  name: string;
}