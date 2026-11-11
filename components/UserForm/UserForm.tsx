'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './UserForm.module.css';

export interface IUserData {
  name: string;
  surName: string;
  tel: string;
  city: string;
  postOffice: string;
  comment?: string;
}

interface UserFormProps {
  title?: string;
  initialData?: IUserData;
  onSubmit: (data: IUserData) => void;
  submitButtonText?: string;
  showComment?: boolean;
}

const phoneRegExp = /^(?:\+?38)?0[0-9]{9}$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[А-Яа-яЁёІіЇїЄєҐґA-Za-z\s]+$/, "Тільки букви")
    .required("Введіть ім'я"),
  surName: Yup.string()
    .matches(/^[А-Яа-яЁёІіЇїЄєҐґA-Za-z\s]+$/, "Тільки букви")
    .required("Введіть прізвище"),
  tel: Yup.string()
    .matches(phoneRegExp, "Введіть коректний український номер (+380...)")
    .required("Введіть номер телефону"),
  city: Yup.string()
    .required("Введіть місто"),
  postOffice: Yup.string()
    .required("Введіть номер відділення"),
  comment: Yup.string(),
});

export const UserForm = ({
  title = 'Особиста інформація',
  initialData = {
    name: '',
    surName: '',
    tel: '',
    city: '',
    postOffice: '',
    comment: '',
  },
  onSubmit,
  submitButtonText = 'Оформити замовлення',
  showComment = true,
}: UserFormProps) => {
  
  const formik = useFormik({
    initialValues: {
      name: initialData.name || '',
      surName: initialData.surName || '',
      tel: initialData.tel || '',
      city: initialData.city || '',
      postOffice: initialData.postOffice || '',
      comment: initialData.comment || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const isNameError = formik.touched.name && Boolean(formik.errors.name);
  const isSurNameError = formik.touched.surName && Boolean(formik.errors.surName);
  const isTelError = formik.touched.tel && Boolean(formik.errors.tel);
  const isCityError = formik.touched.city && Boolean(formik.errors.city);
  const isPostOfficeError = formik.touched.postOffice && Boolean(formik.errors.postOffice);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      {title && <h2 className={styles.formTitle}>{title}</h2>}

      <div className={styles.rowGroup}>
        {/* Поле Ім'я */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="name">
            Ім&apos;я*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваше ім'я"
            className={`${styles.input} ${isNameError ? styles.errorInput : ''}`}
          />
          {isNameError && (
            <span className={styles.errorMessage}>{formik.errors.name}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="surName">
            Прізвище*
          </label>
          <input
            type="text"
            id="surName"
            name="surName"
            value={formik.values.surName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваше прізвище"
            className={`${styles.input} ${isSurNameError ? styles.errorInput : ''}`}
          />
          {isSurNameError && (
            <span className={styles.errorMessage}>{formik.errors.surName}</span>
          )}
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="tel">
          Номер телефону*
        </label>
        <input
          type="tel"
          id="tel"
          name="tel"
          value={formik.values.tel}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="+38 (0__) __-__-___"
          className={`${styles.input} ${isTelError ? styles.errorInput : ''}`}
        />
        {isTelError && (
          <span className={styles.errorMessage}>{formik.errors.tel}</span>
        )}
      </div>

      <div className={styles.rowGroup}>
        
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="city">
            Місто доставки*
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваше місто"
            className={`${styles.input} ${isCityError ? styles.errorInput : ''}`}
          />
          {isCityError && (
            <span className={styles.errorMessage}>{formik.errors.city}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="postOffice">
            Номер відділення Нової Пошти*
          </label>
          <input
            type="text"
            id="postOffice"
            name="postOffice"
            value={formik.values.postOffice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="1"
            className={`${styles.input} ${isPostOfficeError ? styles.errorInput : ''}`}
          />
          {isPostOfficeError && (
            <span className={styles.errorMessage}>{formik.errors.postOffice}</span>
          )}
        </div>
      </div>

      {showComment && (
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="comment">
            Коментар
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Введіть ваш коментар"
            rows={4}
            className={styles.textarea}
          />
        </div>
      )}

      <button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </button>
    </form>
  );
};