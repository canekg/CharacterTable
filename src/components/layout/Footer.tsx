import '@/styles/main.scss';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = observer(() => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="content">
        <p>{t('footer.love')}</p>
        <div className="social-links">
          <a href={'https://github.com/canekg'} target="_blank" rel="noopener noreferrer">
            {t('footer.credit')}
          </a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
