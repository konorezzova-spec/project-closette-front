"use client";

import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { nextServer } from "@/lib/api/api";
import css from "./Footer.module.css";

type SubscribeFormValues = {
  email: string;
};

const initialValues: SubscribeFormValues = {
  email: "",
};

const subscribeSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Введіть коректний email")
    .required("Введіть email"),
});

export default function SubscribeForm() {
  const handleSubmit = async (
    values: SubscribeFormValues,
    { resetForm }: FormikHelpers<SubscribeFormValues>
  ) => {
    try {
      await nextServer.post("/subscriptions", {
        email: values.email.trim(),
      });

      toast.success("Ви успішно підписалися!");
      resetForm();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        toast.error("Цей email уже підписаний!");
        return;
      }

      toast.error("Не вдалося оформити підписку");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={subscribeSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, isSubmitting }) => (
          <Form className={css.footer_form} noValidate>
            <div className={css.form_row}>
              <input
                id="footer-email"
                className={`${css.input} ${errors.email ? css.input_error : ""}`}
                type="email"
                name="email"
                placeholder="Введіть ваш email"
                aria-label="Електронна пошта"
                aria-invalid={Boolean(errors.email)}
                value={values.email}
                onChange={handleChange}
              />

              <button
                className={css.footer_btn}
                type="submit"
                disabled={isSubmitting}
              >
                Підписатися
              </button>
            </div>

            {errors.email && <p className={css.error_text}>{errors.email}</p>}
          </Form>
        )}
      </Formik>
    </>
  );
}
