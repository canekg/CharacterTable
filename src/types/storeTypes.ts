import { ICharacter } from './api';

export interface IStore {
  characters: ICharacter[];
  setDataCharacters: () => void;
  clearCharacters: () => void;
}

export interface ResizingState {
  columnWidths: { [key: string]: string };
  rowHeights: { [key: string]: string };
  isResizing: boolean;
}
