export interface Lecture {
  abstract: string;
  corporate_author: string;
  date: string;
  event_details: string;
  files: any[];
  imprint: string;
  keywords: string[];
  language: string;
  lecture_id: number;
  lecture_note: string;
  license: string;
  series: string;
  speaker: string;
  speaker_details: string;
  sponsor: string;
  subject_category: string;
  thumbnail_picture: string;
  title: string;
  type: any[];
}

export type Lectures = Lecture[];

export type SortMethodType = "relevance" | "oldest" | "newest";
