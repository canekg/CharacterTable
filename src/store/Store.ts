import { i18n } from '@/App';
import { apiService } from '@/api/apiService';
import { ITEMS_PER_PAGE } from '@/constants/settings';
import { ICharacter } from '@/types/api';
import { IStore } from '@/types/storeTypes';
import { action, makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

class Store implements IStore {
  characters: ICharacter[] = [];
  isLoading = false;
  language = localStorage.getItem('language') || 'ru';
  currentPage = parseInt(localStorage.getItem('currentPage') || '1', 10);

  constructor() {
    makeAutoObservable(this, {
      addCharacter: action,
      setCharacters: action,
      clearCharacters: action,
      removeCharacter: action,
      sortCharacters: action,
      setLanguage: action,
      setCurrentPage: action,
    });
    this.loadCharacters();
  }

  setCurrentPage = (page: number) => {
    this.currentPage = page;
    localStorage.setItem('currentPage', page.toString());
  };

  setLanguage = (newLanguage: string) => {
    this.language = newLanguage;
    localStorage.setItem('language', newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  toggleLanguage = action(() => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    this.setLanguage(newLanguage);
  });

  addCharacter = (newCharacter: ICharacter) => {
    this.characters.push(newCharacter);
    this.saveCharacters();
    this.setCurrentPageToLast();
  };

  setCurrentPageToLast = () => {
    const totalPages = Math.ceil(this.characters.length / ITEMS_PER_PAGE);
    this.setCurrentPage(totalPages);
  };

  loadCharacters = () => {
    try {
      const savedCharacters = localStorage.getItem('characters');
      if (savedCharacters) {
        this.characters = JSON.parse(savedCharacters);
      }
    } catch (error) {
      console.error(i18n.t('error_loading_characters'), error);
    }
  };

  setDataCharacters = async () => {
    try {
      this.isLoading = true;
      const data = await apiService.fetchCharacters();
      this.setCharacters(data);
      toast.success(i18n.t('success_data_load'), {
        autoClose: 1500,
        closeOnClick: true,
      });
    } catch (error) {
      toast.error(i18n.t('error_data_load', { error }), {
        autoClose: 1500,
        closeOnClick: true,
      });
    } finally {
      this.isLoading = false;
    }
  };

  setCharacters = (character: ICharacter[]) => {
    this.characters = character;
    this.saveCharacters();
  };

  saveCharacters = () => {
    try {
      localStorage.setItem('characters', JSON.stringify(this.characters));
    } catch (error) {
      console.error(i18n.t('error_data_load'), { error });
    }
  };

  clearCharacters = () => {
    if (this.characters.length > 0) {
      this.characters = [];
      this.saveCharacters();
      toast.success(i18n.t('table_cleared'), {
        autoClose: 1500,
        closeOnClick: true,
      });
    }
  };

  removeCharacter = (index: number) => {
    this.characters.splice(index, 1);
    this.saveCharacters();
  };

  sortCharacters = (field: keyof ICharacter, isAscending = true) => {
    const direction = isAscending ? 1 : -1;
    action(() => {
      this.characters = this.characters.sort((a, b) => {
        const valueA = isNaN(+a[field]) ? a[field] : +a[field];
        const valueB = isNaN(+b[field]) ? b[field] : +b[field];

        if (valueA == null || valueB == null) {
          return valueA == null ? -1 * direction : 1 * direction;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB) * direction;
        }

        return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * direction;
      });
      this.saveCharacters();
    })();
  };
}

export const store = new Store();
export default store;
