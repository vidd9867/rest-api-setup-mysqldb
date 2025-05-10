export interface IUsers {
  uid?: string;
  email: string | null;
  password: string | null;
  sessiontoken?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface IUsersToken {
    uid: string;
    email: string | null;
    sessiontoken?: string | null;
    updated_at?: Date | null;
}
