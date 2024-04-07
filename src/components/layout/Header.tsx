import { store } from '@/store/Store';
import '@/styles/main.scss';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const Header: React.FC = observer(() => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <h1 className="title">{t('header.title')}</h1>
      <div className="buttons">
        <button className="button" onClick={store.setDataCharacters}>
          {t('header.load_data_button')}
        </button>
        <button className="button" onClick={store.clearCharacters}>
          {t('header.clear_table_button')}
        </button>
      </div>
      <button className="language-toggle" onClick={store.toggleLanguage}>
        {t('header.toggle_language_button')}
      </button>
    </header>
  );
});

export default Header;
