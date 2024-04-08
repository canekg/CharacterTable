import routes from '@/routes';
import { APIResponse, ICharacter } from '@/types/api';

export const apiService = {
  fetchCharacters: async (): Promise<ICharacter[]> => {
    try {
      const response = await fetch(routes.dataPath());
      const jsonData: APIResponse<ICharacter> = await response.json();
      return jsonData.results;
    } catch (error) {
      console.error('Ошибка при запросе данных:', error);
      return [];
    }
  },
};
