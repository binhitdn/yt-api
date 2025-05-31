import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import transcriptRouter from "./routes/transcript";

const app = express();
const port = 5000;

// Middleware
app.use(cors());

// Custom logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Parse JSON only for POST, PUT, PATCH requests
app.use((req: Request, res: Response, next: NextFunction) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

// Routes
app.use("/api/transcript", transcriptRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON",
      details: err.message,
    });
  }

  // Handle other errors
  return res.status(500).json({
    error: "Internal Server Error",
    details: err instanceof Error ? err.message : "Unknown error occurred",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
