import { SetCurrentPageType } from '@/types/types';

// Функция для перехода на предыдущую страницу
export const goToPreviousPage = (currentPage: number, setCurrentPage: SetCurrentPageType): void => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

// Функция для перехода на следующую страницу
export const goToNextPage = (
  currentPage: number,
  totalPages: number,
  setCurrentPage: SetCurrentPageType,
): void => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

// Функция для перехода на первую страницу
export const goToFirstPage = (setCurrentPage: SetCurrentPageType): void => {
  setCurrentPage(1);
};

// Функция для перехода на последнюю страницу
export const goToLastPage = (totalPages: number, setCurrentPage: SetCurrentPageType): void => {
  setCurrentPage(totalPages);
};

// Функция для расчёта общего количества страниц
export const calculateTotalPages = (itemsCount: number, itemsPerPage: number): number => {
  return itemsCount === 0 ? 1 : Math.ceil(itemsCount / itemsPerPage);
};
