"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // блокуємо і html, і body — інакше скролиться сторінка під хедером
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} role="dialog" aria-modal="true">
        <button
          className={css.closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Закрити"
        >
          <svg className={css.iconClose} width="24" height="24">
            <use href="/icons/sprite.svg#close" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}