import css from "./GoodReviews.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageNoInfo } from "@/components/MessageNoInfo/MessageNoInfo";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import { fetchFeedbacks } from "@/lib/api/clientApi";

type GoodReviewsProps = {
  goodId: string;
};

const GoodReviews = ({ goodId }: GoodReviewsProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feedbacks", goodId],
    queryFn: () => fetchFeedbacks(goodId),
    enabled: Boolean(goodId),
  });

  const handleAction = () => {
    setIsFormOpen(true);
  };

  if (isLoading) return <p>Завантаження відгуків...</p>;

  if (error || !reviews) return <p>Не вдалося завантажити відгуки.</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Відгуки клієнтів</h2>
        <button
          className={css.btn}
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          Залишити відгук
        </button>
      </div>
      <div className={css.content}>
        {reviews.feedbacks.length > 0 ? (
          <ReviewsList
            reviews={reviews.feedbacks}
            title="Відгуки клієнтів"
            showButton
            onLeaveReview={handleAction}
          />
        ) : (
          <MessageNoInfo
            message="У цього товару ще немає відгуків"
            buttonText="Залишити відгук"
            onClick={handleAction}
          />
        )}
        {/* {isFormOpen && <AddReviewForm />} */}
      </div>
    </div>
  );
};

export default GoodReviews;
