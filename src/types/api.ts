export interface ICharacter {
  name: string;
  gender: string;
  eye_color: string;
  height: string;
  mass: string;
}
export interface APIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
