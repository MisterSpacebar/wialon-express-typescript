// src/types/session.d.ts

declare module 'express-session' {
    export interface session {
      user?: {
        session_id: string;
        name: string;
        user_id: string;
      };
    }
  }