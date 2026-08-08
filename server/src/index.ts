import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { Logger } from "./utils/logger";

// 1. Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Security & Performance Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: Access from this origin is restricted."), false);
    },
    credentials: true,
  })
);

// 3. HTTP Request Logging (Morgan)
const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => Logger.http(message.trim()),
    },
  })
);

// 4. API Routes Mounting
app.use("/api", apiRoutes);

// 5. Global Error Handling Middleware
app.use(errorMiddleware);

// 6. Start listening
app.listen(PORT, () => {
  Logger.info(`Personal Developer Platform API running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
