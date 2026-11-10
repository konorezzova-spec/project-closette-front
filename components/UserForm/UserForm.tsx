'use client';

import { useState } from 'react';
import styles from './UserForm.module.css';

export interface IUserData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  branch: string;
  comment: string;
}

interface UserFormProps {
  title?: string;
  initialData?: IUserData;
  onSubmit: (data: IUserData) => void;
  submitButtonText?: string;
}

export const UserForm = ({
  title = 'Особиста інформація',
  initialData = {
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    branch: '',
    comment: '',
  },
  onSubmit,
  submitButtonText = 'Оформити замовлення',
}: UserFormProps) => {
  const [formData, setFormData] = useState<IUserData>(initialData);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (['firstName', 'lastName', 'city'].includes(name)) {
      filteredValue = value.replace(/[0-9]/g, '');
    }

    if (name === 'phone') {
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
      firstName: true,
      lastName: true,
      phone: true,
      city: true,
      branch: true,
    });

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim() ||
      !formData.branch.trim()
    ) {
      return; 
    }

    onSubmit(formData);
  };

  const isFirstNameError = touched.firstName && !formData.firstName.trim();
  const isLastNameError = touched.lastName && !formData.lastName.trim();
  const isPhoneError = touched.phone && !formData.phone.trim();
  const isCityError = touched.city && !formData.city.trim();
  const isBranchError = touched.branch && !formData.branch.trim();

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {title && <h2 className={styles.formTitle}>{title}</h2>}

      <div className={styles.rowGroup}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="firstName">
            Ім&apos;я*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваше ім'я"
            className={`${styles.input} ${isFirstNameError ? styles.errorInput : ''}`}
          />
          {isFirstNameError && <span className={styles.errorMessage}>Error Text</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="lastName">
            Прізвище*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваше прізвище"
            className={`${styles.input} ${isLastNameError ? styles.errorInput : ''}`}
          />
          {isLastNameError && <span className={styles.errorMessage}>Error Text</span>}
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="phone">
          Номер телефону*
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+38 (0__) __-__-___"
          className={`${styles.input} ${isPhoneError ? styles.errorInput : ''}`}
        />
        {isPhoneError && <span className={styles.errorMessage}>Error Text</span>}
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
          <label className={styles.label} htmlFor="branch">
            Номер відділення Нової Пошти*
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1"
            className={`${styles.input} ${isBranchError ? styles.errorInput : ''}`}
          />
          {isBranchError && <span className={styles.errorMessage}>Error Text</span>}
        </div>
      </div>

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
      </div>

      <button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </button>
    </form>
  );
};