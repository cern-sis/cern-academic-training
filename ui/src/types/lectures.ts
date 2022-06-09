import { Lecture } from './lecture';

export interface Lectures {
  count: number,
  next: string,
  previous: string | null,
  results: Lecture[],
}
