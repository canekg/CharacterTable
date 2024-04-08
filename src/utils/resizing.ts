import { ResizingState } from '@/types/storeTypes';

export const loadResizingState = (): ResizingState => {
  const savedColumnWidths = JSON.parse(localStorage.getItem('columnWidths') || '{}');
  const savedRowHeights = JSON.parse(localStorage.getItem('rowHeights') || '{}');
  return {
    columnWidths: savedColumnWidths,
    rowHeights: savedRowHeights,
    isResizing: false,
  };
};

export const saveResizingState = (resizingState: ResizingState): void => {
  localStorage.setItem('columnWidths', JSON.stringify(resizingState.columnWidths));
  localStorage.setItem('rowHeights', JSON.stringify(resizingState.rowHeights));
};

export const updateDimensions = (
  prevState: ResizingState,
  index: string,
  width?: string,
  height?: string,
): ResizingState => ({
  ...prevState,
  columnWidths: width ? { ...prevState.columnWidths, [index]: width } : prevState.columnWidths,
  rowHeights: height ? { ...prevState.rowHeights, [index]: height } : prevState.rowHeights,
});

export const onResizeMouseDown = (
  event: React.MouseEvent<HTMLDivElement>,
  index: string,
  isColumn: boolean,
  updateDimensionsFunc: (index: string, width?: string, height?: string) => void,
  setResizingState: React.Dispatch<React.SetStateAction<ResizingState>>,
): void => {
  setResizingState((prevState) => ({ ...prevState, isResizing: true }));
  const startX = event.clientX;
  const startY = event.clientY;
  const startWidth = event.currentTarget.parentElement?.offsetWidth || 0;
  const startHeight = event.currentTarget.parentElement?.offsetHeight || 0;

  const onMove = (moveEvent: MouseEvent) => {
    if (isColumn) {
      const currentWidth = startWidth + (moveEvent.clientX - startX);
      updateDimensionsFunc(index, `${currentWidth}px`);
    } else {
      const currentHeight = startHeight + (moveEvent.clientY - startY);
      updateDimensionsFunc(index, undefined, `${currentHeight}px`);
    }
  };

  const onUp = () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    setResizingState((prevState) => ({ ...prevState, isResizing: false }));
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
};
