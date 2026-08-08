import rateLimit from "express-rate-limit";

// Limit standard API queries
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again after 15 minutes.",
  },
});

// Stricter limit for contact form submissions
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // limit each IP to 5 contact messages per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Contact request limit exceeded. Please try again in an hour.",
  },
});
