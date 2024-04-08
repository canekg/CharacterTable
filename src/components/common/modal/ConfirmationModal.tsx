import { ConfirmationModalProps } from '@/types/modal';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  name,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal">
        <p>{t('modal.confirm_deletion_message', { name })}</p>
        <button onClick={onConfirm}>{t('modal.confirm')}</button>
        <button onClick={onClose}>{t('modal.cancel')}</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
