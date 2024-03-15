// src/types/session.d.ts
import "express-session";

declare module 'express-session' {
    export interface sessionData {
      user?: {
        session_id: string;
        name: string;
        user_id: string;
      };
    }
  }