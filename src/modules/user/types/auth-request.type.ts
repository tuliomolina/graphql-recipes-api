import { Request } from "express";

export interface AuthUser {
  userId: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
