import { isAxiosError } from "axios";
import { nextServer } from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  tel: string;
  password: string;
}

// Те, що повертає бекенд після реєстрації (без пароля)
export interface RegisteredUser {
  _id: string;
  name: string;
  email: string;
  tel: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await nextServer.post<RegisteredUser>(
    "/auth/register",
    payload,
  );
  return data;
};

export const requestResetEmail = async (email: string) => {
  await nextServer.post("/auth/request-reset-email", { email });
};

export const resetPassword = async (token: string, password: string) => {
  await nextServer.post("/auth/reset-password", { token, password });
};

// Повідомлення бекенда → текст для користувача
const MESSAGES: Record<string, string> = {
  "Tel in use": "Користувач з таким номером телефону вже існує",
  "Email in use": "Користувач з таким email вже існує",
  "Invalid or expired token":
    "Посилання недійсне або його термін дії завершився. Запросіть нове.",
  "User not found": "Користувача не знайдено",
  "Validation failed": "Перевірте правильність введених даних",
};

const FALLBACK = "Щось пішло не так. Спробуйте пізніше.";

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<{ error?: string; message?: string }>(error)) {
    if (!error.response) {
      return "Не вдалося з’єднатися із сервером. Спробуйте пізніше.";
    }
    const raw =
      error.response.data?.error ?? error.response.data?.message ?? "";
    return MESSAGES[raw] ?? (raw || FALLBACK);
  }
  return FALLBACK;
}

// Перевірка сесії. Бекенд видаляє стару сесію під час refresh, тому паралельні
// виклики об'єднуються в один запит (інакше другий отримає 401).
let sessionCheck: Promise<boolean> | null = null;

export const checkSession = (): Promise<boolean> => {
  if (!sessionCheck) {
    sessionCheck = nextServer
      .get<{ success: boolean }>("/auth/session")
      .then((res) => res.data.success)
      .catch(() => false)
      .finally(() => {
        sessionCheck = null;
      });
  }
  return sessionCheck;
};