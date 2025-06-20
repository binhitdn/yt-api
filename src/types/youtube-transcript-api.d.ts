declare module "youtube-transcript-api" {
  export interface TranscriptResponse {
    text: string;
    duration: number;
    offset: number;
  }

  export class YoutubeTranscript {
    static fetchTranscript(
      videoId: string,
      options?: { lang?: string }
    ): Promise<TranscriptResponse[]>;
  }
}
