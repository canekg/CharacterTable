import { numericValidationRegex, wordValidationRegex } from '@/constants/validationRegex';
import { store } from '@/store/Store';
import '@/styles/main.scss';
import { ICharacter } from '@/types/api';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const AddCharacterPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(wordValidationRegex, t('validation.name.pattern'))
      .required(t('validation.name.required'))
      .test('unique-name', t('validation.name.unique'), function (value) {
        const characters = store.characters;
        return !characters.some((character) => character.name === value);
      }),
    gender: Yup.string()
      .matches(wordValidationRegex, t('validation.gender.pattern'))
      .required(t('validation.gender.required')),
    eye_color: Yup.string()
      .matches(wordValidationRegex, t('validation.eye_color.pattern'))
      .required(t('validation.eye_color.required')),
    height: Yup.string()
      .matches(numericValidationRegex, t('validation.height.pattern'))
      .required(t('validation.height.required')),
    mass: Yup.string()
      .matches(numericValidationRegex, t('validation.mass.pattern'))
      .required(t('validation.mass.required')),
  });

  const handleSubmit = async (
    values: ICharacter,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      store.addCharacter(values);
      toast.success(t('addCharacterPage.success_message'), {
        autoClose: 1500,
        closeOnClick: true,
      });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error(t('addCharacterPage.error_message'), {
        autoClose: 1500,
        closeOnClick: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-character-page">
      <ToastContainer />
      <Link to="/" className="close-button">
        ×
      </Link>
      <h1>{t('add_character')}</h1>
      <Formik
        initialValues={{
          name: '',
          gender: '',
          eye_color: '',
          height: '',
          mass: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Field name="name" type="text" placeholder={t('name')} />
            <ErrorMessage name="name" component="div" className="error" />

            <Field name="gender" type="text" placeholder={t('gender')} />
            <ErrorMessage name="gender" component="div" className="error" />

            <Field name="eye_color" type="text" placeholder={t('eye_color')} />
            <ErrorMessage name="eye_color" component="div" className="error" />

            <Field name="height" type="text" placeholder={t('height')} />
            <ErrorMessage name="height" component="div" className="error" />

            <Field name="mass" type="text" placeholder={t('mass')} />
            <ErrorMessage name="mass" component="div" className="error" />

            <button type="submit" disabled={isSubmitting || !isValid || !dirty}>
              {t('addCharacterPage.add_button')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default AddCharacterPage;
