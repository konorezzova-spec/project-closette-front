'use client';

import { useState } from 'react';
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
  const [formData, setFormData] = useState<IUserData>(initialData);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (['name', 'surName', 'city'].includes(name)) {
      filteredValue = value.replace(/[0-9]/g, '');
    }

    if (name === 'tel') {
      filteredValue = value.replace(/[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: filteredValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      surName: true,
      tel: true,
      city: true,
      postOffice: true,
    });

    if (
      !formData.name.trim() ||
      !formData.surName.trim() ||
      !formData.tel.trim() ||
      !formData.city.trim() ||
      !formData.postOffice.trim()
    ) {
      return; 
    }

    onSubmit(formData);
  };

  const isNameError = touched.name && !formData.name.trim();
  const isSurNameError = touched.surName && !formData.surName.trim();
  const isTelError = touched.tel && !formData.tel.trim();
  const isCityError = touched.city && !formData.city.trim();
  const isPostOfficeError = touched.postOffice && !formData.postOffice.trim();

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {title && <h2 className={styles.formTitle}>{title}</h2>}

      <div className={styles.rowGroup}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="name">
            Ім&apos;я*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваше ім'я"
            className={`${styles.input} ${isNameError ? styles.errorInput : ''}`}
          />
          {isNameError && <span className={styles.errorMessage}>Error Text</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="surName">
            Прізвище*
          </label>
          <input
            type="text"
            id="surName"
            name="surName"
            value={formData.surName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваше прізвище"
            className={`${styles.input} ${isSurNameError ? styles.errorInput : ''}`}
          />
          {isSurNameError && <span className={styles.errorMessage}>Error Text</span>}
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
          value={formData.tel}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+38 (0__) __-__-___"
          className={`${styles.input} ${isTelError ? styles.errorInput : ''}`}
        />
        {isTelError && <span className={styles.errorMessage}>Error Text</span>}
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
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваше місто"
            className={`${styles.input} ${isCityError ? styles.errorInput : ''}`}
          />
          {isCityError && <span className={styles.errorMessage}>Error Text</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="postOffice">
            Номер відділення Нової Пошти*
          </label>
          <input
            type="text"
            id="postOffice"
            name="postOffice"
            value={formData.postOffice}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1"
            className={`${styles.input} ${isPostOfficeError ? styles.errorInput : ''}`}
          />
          {isPostOfficeError && <span className={styles.errorMessage}>Error Text</span>}
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
            value={formData.comment}
            onChange={handleChange}
            placeholder="Введіть ваш коментар"
            rows={4}
            className={styles.textarea}
          />
        </div>)}

      <button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </button>
    </form>
  );
};