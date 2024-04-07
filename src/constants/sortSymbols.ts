import { ICharacter } from '@/types/api';

export const getSortSymbolClass = (
  sortField: keyof ICharacter,
  currentSortField: keyof ICharacter,
  isSortAscending: boolean,
) => {
  if (sortField === currentSortField) {
    return isSortAscending ? 'asc' : 'desc';
  }
  return '';
};
