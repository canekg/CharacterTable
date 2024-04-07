import { IColumn } from '@/types/types';

export const COLUMNS: IColumn[] = [
  { key: 'name', label: 'Name', resizable: true },
  { key: 'gender', label: 'Gender', resizable: true },
  { key: 'eye_color', label: 'Eye Color', resizable: true },
  { key: 'height', label: 'Height', resizable: true },
  { key: 'mass', label: 'Mass', resizable: false, isLast: true },
];
