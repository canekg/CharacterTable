export default {
  translation: {
    loading: 'Загрузка...',
    character_removed_success: 'Персонаж успешно удалён!',
    page: 'Страница',
    of: 'из',
    previous_page: '<',
    next_page: '>',
    first_page: '<<',
    last_page: '>>',
    loading_data: 'Загрузка данных...',
    add_character: 'Добавить персонажа?',
    name: 'Имя',
    gender: 'Пол',
    eye_color: 'Цвет глаз',
    height: 'Рост',
    mass: 'Масса',
    success_data_load: 'Данные загружены!',
    error_data_load: 'Ошибка загрузки данных: {{error}}',
    table_cleared: 'Таблица очищена',
    error_loading_characters: 'Ошибка при загрузке персонажей из localStorage:',
    data_availability_text:
      'Данные отсутствуют (нажмите на кнопку - "Загрузить данные" или добавьте их вручную по ссылке назад)',
    addCharacterPage: {
      required_field: 'Обязательное поле',
      name_already_exists: 'Персонаж с таким именем уже существует',
      success_message: 'Персонаж успешно добавлен!',
      error_message: 'Не удалось добавить персонажа. Попробуйте снова.',
      add_button: 'Добавить',
    },
    modal: {
      confirm_deletion_message: 'Вы уверены, что хотите удалить персонажа {{name}}?',
      confirm: 'Подтвердить',
      cancel: 'Отменить',
    },
    validation: {
      name: {
        required: 'Обязательное поле',
        pattern: 'Должно содержать хотя бы одну букву',
        unique: 'Персонаж с таким именем уже существует',
      },
      gender: {
        required: 'Обязательное поле',
        pattern: 'Должно содержать хотя бы одну букву',
      },
      eye_color: {
        required: 'Обязательное поле',
        pattern: 'Должно содержать хотя бы одну букву',
      },
      height: {
        required: 'Обязательное поле',
        pattern: 'Неверный формат числа',
      },
      mass: {
        required: 'Обязательное поле',
        pattern: 'Неверный формат числа',
      },
    },
    footer: {
      love: 'Мы любим "Звездные войны" настолько же, насколько и вы!',
      credit: 'Создано Александром Фадеевым',
    },
    header: {
      title: 'Персонажи "Звездных войн"',
      load_data_button: 'Загрузить данные',
      clear_table_button: 'Очистить таблицу',
      toggle_language_button: 'Англ',
    },
  },
};
