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
  email?: string;
  search?: boolean;
  genres?: boolean;
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
  description_positive?: string;
  description_neutral?: string;
  description_negative?: string;
}

export type TagValue = {
  id: number;
  tag: string;
  name: string;
  icon: number;
  count: number;
  total: number;
  value: number | string;
  downVotes: number;
  neutralVotes: number;
  upVotes: number;
  userVoteId: number;
  userVoteValue: number;
  description_positive?: string;
  description_neutral?: string;
  description_negative?: string;
}

export type Platform = {
  id: number;
  platform: number;
  name: string;
}

export type GenreMode = {
  id: number;
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