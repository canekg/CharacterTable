// Открытие модального окна
export const openModal = (
  setIsModalVisible: (isVisible: boolean) => void,
  setSelectedCharacter: (characterIndex: number | null) => void,
  setNameDeletedCharacter: (characterName: string | null) => void,
  characterIndex: number,
  characterName: string
) => {
  setIsModalVisible(true);
  setSelectedCharacter(characterIndex);
  setNameDeletedCharacter(characterName);
};

// Закрытие модального окна
export const closeModal = (
  setIsModalVisible: (isVisible: boolean) => void,
  setSelectedCharacter: (characterIndex: number | null) => void,
  setNameDeletedCharacter: (characterName: string | null) => void
) => {
  setIsModalVisible(false);
  setSelectedCharacter(null);  // Очищаем выбранного персонажа
  setNameDeletedCharacter(null);  // Очищаем имя удаляемого персонажа
};

// Подтверждение удаления персонажа
export const confirmDeletion = (
  selectedCharacter: number | null,
  store: { removeCharacter: (index: number) => void },
  setIsModalVisible: (isVisible: boolean) => void,
  toast: { success: (msg: string, options?: { autoClose: number, closeOnClick: boolean }) => void },
  t: (key: string) => string
) => {
  if (selectedCharacter !== null) {
    store.removeCharacter(selectedCharacter);
    setIsModalVisible(false);
    toast.success(t('character_removed_success'), {
      autoClose: 1500,
      closeOnClick: true,
    });
  }
};
