"use client";

import { useState, type InputHTMLAttributes } from "react";
import styles from "./FormField.module.css";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

function EyeIcon({ crossed }: { crossed: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 12s3.8-7 10.5-7 10.5 7 10.5 7-3.8 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
      {crossed && <path d="M3 3l18 18" />}
    </svg>
  );
}

export default function FormField({
  id,
  label,
  error,
  type,
  ...inputProps
}: FormFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isPassword = type === "password";
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div className={styles.control}>
        <input
          id={id}
          type={isPassword && isVisible ? "text" : type}
          className={`${styles.input} ${isPassword ? styles.inputPassword : ""} ${error ? styles.inputError : ""}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "Сховати пароль" : "Показати пароль"}
            aria-pressed={isVisible}
          >
            <EyeIcon crossed={isVisible} />
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}