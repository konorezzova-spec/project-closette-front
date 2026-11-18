"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormField from "@/components/FormField/FormField";
import Rating from "@/components/Rating/Rating";
import { createFeedback } from "@/lib/api/clientApi";
import { getApiErrorMessage } from "@/lib/api/authApi";
import { useReviewDraftStore } from "@/lib/store/reviewDraftStore";
import css from "./AddReviewForm.module.css";

interface FeedbackValues {
  author: string;
  description: string;
  rate: number;
}

const EMPTY_VALUES: FeedbackValues = { author: "", description: "", rate: 0 };

const feedbackSchema: Yup.ObjectSchema<FeedbackValues> = Yup.object({
  author: Yup.string()
    .trim()
    .min(2, "Мінімум 2 символи")
    .required("Вкажіть ім’я"),
  description: Yup.string()
    .trim()
    .max(260, "Максимум 260 символів")
    .required("Напишіть відгук"),
  rate: Yup.number().min(1, "Оберіть оцінку").max(5).required("Оберіть оцінку"),
});
// #endregion

type AddReviewFormProps = {
  goodId: string;
  onSuccess: () => void;
};

export default function AddReviewForm({
  goodId,
  onSuccess,
}: AddReviewFormProps) {
  const queryClient = useQueryClient();
  const setDraft = useReviewDraftStore(state => state.setDraft);
  const clearDraft = useReviewDraftStore(state => state.clearDraft);

  const { mutate, isPending } = useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      clearDraft(goodId);
      queryClient.invalidateQueries({ queryKey: ["feedbacks", goodId] });
      queryClient.invalidateQueries({ queryKey: ["good", goodId] });
      toast.success("Дякуємо за відгук!");
      onSuccess();
    },
    onError: error => toast.error(getApiErrorMessage(error)),
  });

  const formik = useFormik<FeedbackValues>({
    initialValues: useReviewDraftStore.getState().drafts[goodId] ?? EMPTY_VALUES,
    validationSchema: feedbackSchema,
    onSubmit: values => {
      mutate({
        author: values.author.trim(),
        description: values.description.trim(),
        rate: values.rate,
        productId: goodId,
      });
    },
  });

  useEffect(() => {
    const { author, description, rate } = formik.values;
    const isEmpty = !author.trim() && !description.trim() && !rate;

    if (isEmpty) {
      clearDraft(goodId);
    } else {
      setDraft(goodId, formik.values);
    }
  }, [goodId, formik.values, setDraft, clearDraft]);
  
  const errorFor = (field: keyof FeedbackValues) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
      <h2 className={css.title}>Залишити відгук</h2>

      <div className={css.input}>
        <FormField
          id="author"
          label="Ваше ім’я"
          type="text"
          placeholder="Ваше ім’я"
          autoComplete="name"
          {...formik.getFieldProps("author")}
          error={errorFor("author")}
        />
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="description">
          Відгук
        </label>
        <textarea
          id="description"
          className={`${css.textarea} ${errorFor("description") ? css.textareaError : ""}`}
          placeholder="Ваш відгук"
          rows={5}
          maxLength={260}
          {...formik.getFieldProps("description")}
        />
        {errorFor("description") && (
          <p className={css.error}>{errorFor("description")}</p>
        )}
      </div>

      <div className={`${css.field} ${css.rating}`}>
        <Rating
          value={formik.values.rate}
          onChange={value => formik.setFieldValue("rate", value)}
        />
        {errorFor("rate") && <p className={css.error}>{errorFor("rate")}</p>}
      </div>

      <button className={css.button} type="submit" disabled={isPending}>
        {isPending ? "Надсилання…" : "Надіслати"}
      </button>
    </form>
  );
}
