import { ICharacter } from '@/types/api';

type SortOrder = 'asc' | 'desc';

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
