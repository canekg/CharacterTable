import { ICharacter } from './api';

export type HeaderMap = Record<string, keyof ICharacter>;

export interface IColumn {
  key: keyof ICharacter;
  label: string;
  resizable: boolean;
  isLast?: boolean;
}

export type SetCurrentPageType = (page: number) => void;
