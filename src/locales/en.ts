export default {
  translation: {
    loading: 'Loading...',
    character_removed_success: 'Character successfully removed!',
    page: 'Page',
    of: 'of',
    previous_page: '<',
    next_page: '>',
    first_page: '<<',
    last_page: '>>',
    loading_data: 'Loading data...',
    add_character: 'Add a character?',
    name: 'Name',
    gender: 'Gender',
    eye_color: 'Eye Color',
    height: 'Height',
    mass: 'Mass',
    success_data_load: 'Data loaded!',
    error_data_load: 'Error loading data: {{error}}',
    table_cleared: 'Table cleared',
    error_loading_characters: 'Error loading characters from localStorage:',
    data_availability_text:
      'No data available (click the "Load Data" button or add them manually via the link below)',
    addCharacterPage: {
      required_field: 'Required field',
      name_already_exists: 'A character with this name already exists',
      success_message: 'Character successfully added!',
      error_message: 'Failed to add character. Please try again.',
      add_button: 'Add',
    },
    modal: {
      confirm_deletion_message: 'Are you sure you want to delete the character {{name}}?',
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
    validation: {
      name: {
        required: 'Required field',
        pattern: 'Must contain at least one letter',
        unique: 'A character with this name already exists',
      },
      gender: {
        required: 'Required field',
        pattern: 'Must contain at least one letter',
      },
      eye_color: {
        required: 'Required field',
        pattern: 'Must contain at least one letter',
      },
      height: {
        required: 'Required field',
        pattern: 'Invalid number format',
      },
      mass: {
        required: 'Required field',
        pattern: 'Invalid number format',
      },
    },
    footer: {
      love: 'We love "Star Wars" just as much as you do!',
      credit: 'Created by Alexander Fadeev',
    },
    header: {
      title: 'Star Wars Characters',
      load_data_button: 'Load Data',
      clear_table_button: 'Clear Table',
      toggle_language_button: 'RU',
    },
  },
};
