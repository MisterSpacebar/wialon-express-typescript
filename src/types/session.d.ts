// src/types/session.d.ts
import "express-session";

declare module 'express-session' {
  export interface SessionData {
    user?: { session_id: string; name: string; user_id: number; };
  }
}