import resources from '@/locales/index';
import routes from '@/routes';
import i18next from 'i18next';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import AddCharacterPage from './components/pages/AddCharacterPage';
import Table from './components/pages/Main';
import store from './store/Store';

export const i18n = i18next.createInstance();
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: store.language,
  interpolation: {
    escapeValue: false,
  },
});

const App = observer(() => {
  return (
    <I18nextProvider i18n={i18n}>
      <Routes>
        <Route path={routes.addCharacter()} element={<AddCharacterPage />} />
        <Route path={routes.main()} element={<Table />} />
      </Routes>
    </I18nextProvider>
  );
});

export default App;
