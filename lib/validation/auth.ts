import * as Yup from "yup";

// Правила збігаються з Joi-схемами бекенда (src/validations/authValidation.js)

const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const EMAIL_MESSAGE = "Некоректний email. Приклад: name@example.com";

const PASSWORD_ALLOWED_RE = /^[\x21-\x7E]+$/;
const PASSWORD_HINT =
  "Пароль: 8–128 символів, великі й малі латинські літери та цифри, без пробілів. Дозволені символи: . ! ? _ - тощо";

function passwordSchema() {
  return Yup.string()
    .required("Вкажіть пароль")
    .min(8, PASSWORD_HINT)
    .max(128, PASSWORD_HINT)
    .matches(PASSWORD_ALLOWED_RE, PASSWORD_HINT)
    .matches(/[a-z]/, PASSWORD_HINT)
    .matches(/[A-Z]/, PASSWORD_HINT)
    .matches(/\d/, PASSWORD_HINT);
}

export function validateName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Вкажіть ім’я";
  if (v.length < 2) return "Мінімум 2 символи";
  if (v.length > 32) return "Максимум 32 символи";
}

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Вкажіть email";
  if (v.length > 64 || !EMAIL_RE.test(v)) return "Некоректний email";
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Вкажіть пароль";
  if (value.length < 8) return "Мінімум 8 символів";
  if (value.length > 128) return "Максимум 128 символів";
}

/** Національна частина номера: 10 цифр, що починаються з 0 (0501234567) */
function nationalDigits(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("38")) digits = digits.slice(2);
  return digits.slice(0, 10);
}

/** Маска «+38 (0XX) XXX-XX-XX». Розділювачі додаються лише перед наступною цифрою,
    тому Backspace працює без «залипання». */
export function formatPhone(value: string): string {
  const n = nationalDigits(value);
  if (!n) return "";
  let out = `+38 (${n.slice(0, 3)}`;
  if (n.length > 3) out += `) ${n.slice(3, 6)}`;
  if (n.length > 6) out += `-${n.slice(6, 8)}`;
  if (n.length > 8) out += `-${n.slice(8, 10)}`;
  return out;
}

export function validatePhone(value: string): string | undefined {
  const n = nationalDigits(value);
  if (!n) return "Вкажіть номер телефону";
  if (n.length !== 10 || !n.startsWith("0")) return "Некоректний номер телефону";
}

/** «+38 (050) 123-45-67» → «+380501234567» (формат, якого чекає бекенд) */
export function toApiPhone(value: string): string {
  return `+38${nationalDigits(value)}`;
}

// ===== Yup-схема форми реєстрації (для Formik) =====

export interface RegistrationValues {
  name: string;
  tel: string;
  email: string;
  password: string;
}

export const registrationSchema: Yup.ObjectSchema<RegistrationValues> =
  Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Мінімум 2 символи")
      .max(32, "Максимум 32 символи")
      .required("Вкажіть ім’я"),
    tel: Yup.string()
      .required("Вкажіть номер телефону")
      .test("phone", "Некоректний номер телефону", (value) => !validatePhone(value ?? "")),
    email: Yup.string()
      .trim()
      .email("Некоректний email")
      .max(64, "Максимум 64 символи")
      .required("Вкажіть email"),
      password: Yup.string()
      .min(8, "Мінімум 8 символів")
      .max(128, "Максимум 128 символів")
      .required("Вкажіть пароль"),
  });

// ===== Скидання пароля =====
export interface ForgotPasswordValues {
  email: string;
}

export const forgotPasswordSchema: Yup.ObjectSchema<ForgotPasswordValues> =
  Yup.object({
    email: Yup.string()
      .trim()
      .email("Некоректний email")
      .max(64, "Максимум 64 символи")
      .matches(EMAIL_RE, EMAIL_MESSAGE)
      .required("Вкажіть email"),
  });

export interface ResetPasswordValues {
  password: string;
  confirm: string;
}

export const resetPasswordSchema: Yup.ObjectSchema<ResetPasswordValues> =
  Yup.object({
    password: passwordSchema(),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "Паролі не збігаються")
      .required("Повторіть пароль"),
  });