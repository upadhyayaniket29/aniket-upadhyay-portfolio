import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Logger } from "../utils/logger";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  Logger.error(`API Error: ${err.message || err}`, { stack: err.stack });

  // 1. Zod Validation Error formatting
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed.",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // 2. Prisma Database Errors
  if (err.code && err.code.startsWith("P")) {
    return res.status(400).json({
      error: "Database transaction failed.",
      code: err.code,
      message: process.env.NODE_ENV === "production" ? undefined : err.message,
    });
  }

  // 3. Generic Fallback Error
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Internal server error.",
  });
}
