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
  admin: true;
  auth_token: string;
}


export type Params = {
  id: string | null;
}

export type Evaluation = {
  user_ID: string;
  paid: boolean;
  participated: boolean;
}

export type PhotoType = {
  uri: string | undefined
}