declare module "youtube-transcript" {
  export interface TranscriptResponse {
    text: string;
    duration: number;
    offset: number;
  }

  export interface TranscriptConfig {
    lang?: string;
  }

  export class YoutubeTranscript {
    static fetchTranscript(
      videoId: string,
      options?: TranscriptConfig
    ): Promise<TranscriptResponse[]>;
  }
}
