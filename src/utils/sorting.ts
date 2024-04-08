import store from '@/store/Store';
import { ICharacter } from '@/types/api';
import { SortOrder } from '@/types/types';

export const sortCharacters = (
  characters: ICharacter[],
  field: keyof ICharacter,
  order: SortOrder = 'asc',
): ICharacter[] => {
  return [...characters].sort((a, b) => {
    if (a[field] < b[field]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

export const sortCharactersByField = (field: keyof ICharacter, isAscending: boolean) => {
  store.sortCharacters(field, isAscending);
};
