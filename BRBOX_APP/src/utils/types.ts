export type Game = {
  id: number;
  name: string;
  image: string;
  tags: any[];
  score: number;
  votecount: number;
  uservotedcount: number;
  isDlc: boolean;
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
  top3?: boolean;
  top5?: boolean;
  tags?: TagValue[];
  email?: string;
  search?: boolean;
  genres?: boolean;
  filterUser?: boolean;
  watchlist?: boolean;
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

export type NewLinkType = {
  id: number,
  platform: number,
  platformName: string,
  link: string,
  imageURL: string,
  promotion: boolean,
  order: number
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
  description?: string;
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

export type RadioOption = {
  value: number;
  text: string;
}

export type Message = {
  title: number;
  message: number;
}