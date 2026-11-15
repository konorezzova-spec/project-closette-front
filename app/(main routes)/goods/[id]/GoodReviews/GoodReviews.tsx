import GoodReviewsForm from "./GoodReviewsForm";
import styles from "./GoodReviews.module.css";
import Image from "next/image";
import close from "/public/header/close.svg";

interface GoodReviewsProps {
  productId: string;

  onClose: () => void;
  onSuccess?: () => void;
}

export default function GoodReviews({
  productId,
  onClose,
  onSuccess,
}: GoodReviewsProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rewiew-title"
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="close"
        >
          <Image
            className={styles.logo}
            src={close}
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <h2 id="review-title" className={styles.title}>
          Залишити відгук
        </h2>
        <GoodReviewsForm onSuccess={onSuccess} productId={productId} />
      </div>
    </div>
  );
}
