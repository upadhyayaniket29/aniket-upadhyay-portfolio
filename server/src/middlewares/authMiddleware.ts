import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Logger } from "../utils/logger";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const jwtSecret = process.env.JWT_SECRET || "fallback_super_secret_jwt_key_123";
    const decoded = jwt.verify(token, jwtSecret) as any;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden. Admin access required." });
    }

    next();
  } catch (err) {
    Logger.error("JWT Verification failed:", err);
    res.status(401).json({ error: "Invalid token credentials." });
  }
}
