import { SetCurrentPageType } from '@/types/types';

export const goToPreviousPage = (currentPage: number, setCurrentPage: SetCurrentPageType): void => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

export const goToNextPage = (
  currentPage: number,
  totalPages: number,
  setCurrentPage: SetCurrentPageType,
): void => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

export const goToFirstPage = (setCurrentPage: SetCurrentPageType): void => {
  setCurrentPage(1);
};

export const goToLastPage = (totalPages: number, setCurrentPage: SetCurrentPageType): void => {
  setCurrentPage(totalPages);
};

export const calculateTotalPages = (itemsCount: number, itemsPerPage: number): number => {
  return itemsCount === 0 ? 1 : Math.ceil(itemsCount / itemsPerPage);
};
