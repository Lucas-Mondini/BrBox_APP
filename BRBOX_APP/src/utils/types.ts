export type Game = {
  id: number;
  name: string;
  image: string;
  tags: any[];
}

export type User = {
  id: number;
  username: string;
  email: string;
  admin: boolean;
  auth_token: string;
}

export type Params = {
  id?: number;
  new?: boolean;
  tags?: TagValue[];
  search?: boolean;
  filterUser?: boolean;
}

export type Evaluation = {
  id: number;
  tag: Tag;
  user: User;
  value: Value;
}

export type ImageType = {
  id?: number;
  name: string;
  link: string;
}

export type LinkType = {
  id: number;
  link: string;
  platform: number;
  platformName: string;
}

export type Tag = {
  id: number;
  icon: number;
  name: string;
  evalId: number;
  value?: number;
  count?: number;
  upVotes?: number;
  neutralVotes?: number;
  downVotes?: number;
  description?: string;
}

export type TagValue = {
  id: number;
  tag: string;
  name: string;
  icon: number;
  count: number;
  downVotes: number;
  neutralVotes: number;
  upVotes: number;
  total: number;
  description?: string;
}

export type Platform = {
  id: number;
  platform: number;
  name: string;
}

export type BusinessModel = {
  id: number;
  name: string;
  description: string;
}

export type Value = {
  id: number;
  name: string;
}