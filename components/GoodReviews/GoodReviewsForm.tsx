"use client";

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./GoodReviews.module.css";
import { GoodReviewValues } from "@/types/good";
import { addGoodReview } from "@/lib/api/clientApi";
import toast from "react-hot-toast";

interface GoodReviewsFormProps {
  productId: string;
  onSuccess?: () => void;
}
const validationSchema = Yup.object({
  author: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  rate: Yup.number()
    .min(1, "Rating is required")
    .max(5)
    .required("Rating is required"),
});

export default function GoodReviewsForm({
  productId,
  onSuccess,
}: GoodReviewsFormProps) {
  const handlerSubmit = async (
    values: GoodReviewValues,
    action: FormikHelpers<GoodReviewValues>
  ) => {
    try {
      await addGoodReview({ ...values, productId });
      toast.success("Review sent successfully");
      onSuccess?.();
    } catch (error){
      toast.error("Review sent error");
      console.error("Feedback error: ", error);
    } finally {
      action.setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{ author: "", description: "", rate: 0 }}
      validationSchema={validationSchema}
      onSubmit={handlerSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="author" className={styles.label}>
              Ваше імʼя
            </label>

            <Field
              id="author"
              name="author"
              type="text"
              placeholder="Ваше імʼя"
              className={styles.input}
            />

            <ErrorMessage
              name="author"
              component="p"
              className={styles.error}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="description" className={styles.label}>
              Відгук
            </label>

            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="Ваш відгук"
              className={styles.textarea}
            />

            <ErrorMessage
              name="description"
              component="p"
              className={styles.error}
            />
          </div>

          <div className={styles.rating} role="group" aria-label="Оцінка">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`${styles.star} ${
                  star <= values.rate ? styles.activeStar : ""
                }`}
                aria-label={`${star} з 5`}
                aria-pressed={values.rate === star}
                onClick={() => setFieldValue("rate", star)}
              >
                {star <= values.rate ? "★" : "☆"}
              </button>
            ))}
          </div>

          <ErrorMessage name="rate" component="p" className={styles.error} />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            Надіслати
          </button>
        </Form>
      )}
    </Formik>
  );
}
