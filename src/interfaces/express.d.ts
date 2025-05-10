import { IUsersToken } from './IUsers';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Using any for now, but you can make this more specific based on your IUsersToken interface
    }
  }
}

export {}; 