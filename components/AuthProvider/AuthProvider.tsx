"use client";

import { useEffect } from "react";
import { checkSession } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    const verify = async () => {
      // 1. Відновлюємо користувача із localStorage
      await useAuthStore.persist.rehydrate();

      // 2. Перевіряємо сесію; якщо вона недійсна, очищаємо стан
      const isValid = await checkSession();
      if (!isValid) clearIsAuthenticated();
    };
    verify();
  }, [clearIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;