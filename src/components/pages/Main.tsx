import { COLUMNS } from '@/constants/columns';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import { getSortSymbolClass } from '@/constants/sortSymbols';
import { store } from '@/store/Store';
import '@/styles/main.scss';
import { ICharacter } from '@/types/api';
import { ResizingState } from '@/types/storeTypes';
import { HeaderMap } from '@/types/types';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../layout/Footer';
import Header from '../layout/Header';

const TableComponent: React.FC = observer(() => {
  const [sortField, setSortField] = useState<keyof ICharacter | null>(null);
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [resizingState, setResizingState] = useState<ResizingState>({
    columnWidths: {},
    rowHeights: {},
    isResizing: false,
  });
  const [nameDeletedCharacter, setNameDeletedCharacter] = useState<string | null>(null);

  const { currentPage, setCurrentPage } = store;

  const { t } = useTranslation();

  const HEADERS: HeaderMap = {
    [t('name')]: 'name',
    [t('gender')]: 'gender',
    [t('eye_color')]: 'eye_color',
    [t('height')]: 'height',
    [t('mass')]: 'mass',
  };

  const totalPages =
    store.characters.length === 0 ? 1 : Math.ceil(store.characters.length / ITEMS_PER_PAGE);
  const startItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItemIndex = startItemIndex + ITEMS_PER_PAGE;
  const currentItems = store.characters.slice(startItemIndex, endItemIndex);
  const dataAvailabilityText = store.isLoading ? t('loading_data') : t('data_availability_text');

  useEffect(() => {
    const savedColumnWidths = JSON.parse(localStorage.getItem('columnWidths') || '{}');
    const savedRowHeights = JSON.parse(localStorage.getItem('rowHeights') || '{}');
    setResizingState({
      columnWidths: savedColumnWidths,
      rowHeights: savedRowHeights,
      isResizing: resizingState.isResizing,
    });
  }, []);

  const updateDimensions = useCallback(
    (index: string, width?: string, height?: string) => {
      setResizingState((prevState) => ({
        ...prevState,
        columnWidths: width
          ? { ...prevState.columnWidths, [index]: width }
          : prevState.columnWidths,
        rowHeights: height ? { ...prevState.rowHeights, [index]: height } : prevState.rowHeights,
      }));
    },
    [resizingState.columnWidths, resizingState.rowHeights],
  );

  useEffect(() => {
    localStorage.setItem('columnWidths', JSON.stringify(resizingState.columnWidths));
    localStorage.setItem('rowHeights', JSON.stringify(resizingState.rowHeights));
  }, [resizingState.columnWidths, resizingState.rowHeights]);

  const onResizeMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, index: string, isColumn: boolean) => {
      setResizingState((prevState) => ({ ...prevState, isResizing: true }));
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = event.currentTarget.parentElement?.offsetWidth || 0;
      const startHeight = event.currentTarget.parentElement?.offsetHeight || 0;

      const onMove = (moveEvent: MouseEvent) => {
        if (isColumn) {
          const currentWidth = startWidth + (moveEvent.clientX - startX);
          updateDimensions(index, `${currentWidth}px`, undefined);
        } else {
          const currentHeight = startHeight + (moveEvent.clientY - startY);
          updateDimensions(index, undefined, `${currentHeight}px`);
        }
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        setResizingState((prevState) => ({ ...prevState, isResizing: false }));
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [updateDimensions],
  );

  useEffect(() => {
    const totalPages =
      store.characters.length === 0 ? 1 : Math.ceil(store.characters.length / ITEMS_PER_PAGE);

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      localStorage.setItem('currentPage', totalPages.toString());
    } else if (totalPages === 0) {
      localStorage.removeItem('currentPage');
    } else {
      localStorage.setItem('currentPage', currentPage.toString());
    }
  }, [currentPage, store.characters.length]);

  const handlePreviousClick = () => {
    store.setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
    store.setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  const handleLastPageClick = () => {
    setCurrentPage(totalPages);
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    if (resizingState.isResizing) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, dropIndex: number) => {
    if (draggedIndex === dropIndex) return;
    const newRows = [...store.characters];
    const [draggedRow] = newRows.splice(draggedIndex!, 1);
    newRows.splice(dropIndex, 0, draggedRow);
    store.setCharacters(newRows);
  };

  const sortPeopleByField = (field: keyof ICharacter) => {
    setSortField(field);
    setIsSortAscending(!isSortAscending);
    store.sortCharacters(field, isSortAscending);
  };

  const openModal = (index: number) => {
    setIsModalVisible(true);
    setSelectedCharacter(index);
    setNameDeletedCharacter(currentItems[index].name);
  };

  const confirmDeletion = () => {
    if (selectedCharacter !== null) {
      store.removeCharacter(selectedCharacter);
      setIsModalVisible(false);
      toast.success(t('character_removed_success'), {
        autoClose: 1500,
        closeOnClick: true,
      });
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleSortClick = (field: keyof ICharacter) => {
    sortPeopleByField(field);
  };

  return (
    <div className="site-container">
      <ToastContainer />
      {isModalVisible && (
        <div className="modal-container">
          <div className="modal">
            <p>{t('modal.confirm_deletion_message', { name: nameDeletedCharacter })}</p>
            <button onClick={confirmDeletion}>{t('modal.confirm')}</button>
            <button onClick={closeModal}>{t('modal.cancel')}</button>
          </div>
        </div>
      )}
      <Header />
      <main>
        <table>
          <thead>
            <tr>
              {Object.entries(HEADERS).map(([headerText, headerKey], index) => (
                <th
                  key={headerKey}
                  onClick={() => handleSortClick(headerKey)}
                  style={{ width: resizingState.columnWidths[headerKey] }}
                >
                  <span className="th-text">{headerText}</span>
                  {index !== Object.entries(HEADERS).length - 1 ? (
                    <div
                      className="table-resize-handle column-resize-handle"
                      onMouseDown={(e) => onResizeMouseDown(e, headerKey, true)}
                    />
                  ) : null}
                  <span
                    className={`sort-symbol ${getSortSymbolClass(headerKey, sortField, isSortAscending)}`}
                    onClick={() => sortPeopleByField(headerKey)}
                  ></span>
                </th>
              ))}
            </tr>
          </thead>
          {[...currentItems].length > 0 ? (
            <tbody>
              {currentItems.map((character, index) => (
                <tr
                  key={index}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  style={{ height: resizingState.rowHeights[index.toString()] }}
                >
                  {COLUMNS.map((column) => (
                    <td key={column.key} className={column.isLast ? 'data-with-button' : ''}>
                      {column.isLast ? (
                        <>
                          <span className="td-text">{character[column.key]}</span>
                          <button className="delete-button" onClick={() => openModal(index)}>
                            &times;
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="td-text">{character[column.key]}</span>
                          <div
                            className="table-resize-handle column-resize-handle"
                            onMouseDown={(e) => onResizeMouseDown(e, column.key, true)}
                          />
                        </>
                      )}
                      <div
                        className="table-resize-handle row-resize-handle"
                        onMouseDown={(e) => onResizeMouseDown(e, index.toString(), false)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td colSpan={Object.keys(HEADERS).length} className="add-row">
                  <Link to={'/add'} className="full-cell-link">
                    {t('add_character')}
                  </Link>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={Object.keys(HEADERS).length}
                  style={{ textAlign: 'center', padding: '10px' }}
                >
                  {dataAvailabilityText}
                </td>
              </tr>
              <tr>
                <td colSpan={Object.keys(HEADERS).length} className="add-row">
                  <Link to={'/add'} className="full-cell-link">
                    {t('add_character')}
                  </Link>
                </td>
              </tr>
            </tbody>
          )}
        </table>
        <div className="pagination-controls">
          <button onClick={handleFirstPageClick} disabled={currentPage === 1}>
            {t('first_page')}
          </button>
          <button onClick={handlePreviousClick} disabled={currentPage === 1}>
            {t('previous_page')}
          </button>
          <span>
            {t('page')} {currentPage} {t('of')} {totalPages}
          </span>
          <button onClick={handleNextClick} disabled={currentPage === totalPages}>
            {t('next_page')}
          </button>
          <button onClick={handleLastPageClick} disabled={currentPage === totalPages}>
            {t('last_page')}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
});

export default TableComponent;
