import { Router, Request, Response, NextFunction } from "express";
import { YoutubeTranscript } from "youtube-transcript";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const videoId = req.query.videoId;

  if (!videoId || typeof videoId !== "string") {
    return res.status(400).json({
      error: "Missing or invalid videoId",
      details: "Please provide a valid YouTube video ID or URL",
    });
  }

  try {
    // Kiểm tra xem có phải URL YouTube không
    let finalVideoId = videoId;
    if (videoId.includes("youtube.com") || videoId.includes("youtu.be")) {
      try {
        const url = new URL(videoId);
        if (url.searchParams.has("v")) {
          finalVideoId = url.searchParams.get("v") || videoId;
        } else if (url.hostname === "youtu.be") {
          finalVideoId = url.pathname.slice(1);
        }
      } catch (urlError) {
        console.log("Invalid URL format, using as video ID:", videoId);
      }
    }

    console.log("Fetching transcript for video:", finalVideoId);
    const transcript = await YoutubeTranscript.fetchTranscript(finalVideoId, {
      lang: "ja",
    });

    if (!transcript || transcript.length === 0) {
      return res.status(404).json({
        error: "No transcript found",
        details: "Could not find transcript for the specified video",
      });
    }

    return res.status(200).json({ transcript });
  } catch (err) {
    // Chuyển lỗi cho error handling middleware xử lý
    next(err);
  }
});

export default router;
