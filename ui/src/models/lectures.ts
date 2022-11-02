export interface Lecture {
  abstract: string;
  corporate_author: string;
  date: string;
  event_details: string;
  files: string[];
  imprint: string;
  keywords: string[];
  language: string;
  lecture_id: number;
  lecture_note: string;
  license: string;
  series: string;
  speaker: string[];
  speaker_details: string[];
  sponsor: string;
  subject_category: string;
  thumbnail_picture: string;
  title: string;
  types: string[];
}

export type Lectures = Lecture[];

export enum SortOptions {
  Default = "relevance",
  Oldest = "date",
  Newest = "-date",
}
