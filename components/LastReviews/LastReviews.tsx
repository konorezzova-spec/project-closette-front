
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import Container from "@/components/Container/Container";
import { fetchFeedbacks } from "@/lib/api/serverApi";
import type { Feedback } from "@/types/feedback";
import css from "./LastReviews.module.css";

export default async function LastReviews() {
  let feedbacksData: Feedback[] = [];
    try {
      const response = await fetchFeedbacks({ page: 1, perPage: 10 });
      feedbacksData = response.feedbacks;
    } catch (error) {
      console.error("Не вдалося завантажити останні відгуки", error);
    }
  return (
    <Container>
      <h2 className={css.title}>Останні відгуки</h2>
      <ReviewsList
        reviews={feedbacksData}
        showProduct
       />
    </Container>
  )
}
