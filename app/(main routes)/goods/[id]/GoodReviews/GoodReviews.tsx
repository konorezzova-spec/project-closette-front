import css from "./GoodReviews.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageNoInfo } from "@/components/MessageNoInfo/MessageNoInfo";

type GoodReviewsProps = {
  goodId: string;
};

// створено лише для прикладу, потім потрібно видалити та замінити на реальну
const fetchFeedbacks = () => {};

const GoodReviews = ({ goodId }: GoodReviewsProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: feedbacks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feedbacks", goodId],
    queryFn: () => fetchFeedbacks(),
    refetchOnMount: false,
  });

  //   if (isLoading) return <p>Loading, please wait...</p>;

  //   if (error || !feedbacks) return <p>Something went wrong.</p>;

  const handleAction = () => {
    setIsFormOpen(true);
  };

  return (
    <main className={css.main}>
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
          <MessageNoInfo
            message="У цього товару ще немає відгуків"
            buttonText="Залишити відгук"
            onAction={handleAction}
          />
          {/* {feedbacks.length > 0 ? (
            <ReviewsList />
          ) : (
            <MessageNoInfo
              message="У цього товару ще немає відгуків"
              buttonText="Залишити відгук"
              onAction={handleAction}
            />
          )} */}
          {/* {isFormOpen && <AddReviewForm />} */}
        </div>
      </div>
    </main>
  );
};

export default GoodReviews;
