import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { AUTH_KEYS } from "@/constants/index";
import { tokenAtom } from "@/utils/atom";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync(AUTH_KEYS.USER_TOKEN);
      setToken(token);
    };

    fetchToken();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
