import React, { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import * as SecureStore from "expo-secure-store";
import { AUTH_KEYS } from "@/constants/index";
import { tokenAtom } from "@/utils/atom";
import { ActivityIndicator, Text, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setToken = useSetAtom(tokenAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(AUTH_KEYS.USER_TOKEN);
        setToken(token);
      } catch (error) {
        console.error("Error fetching token:", error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (isLoading) {
    return <ActivityIndicator color="red" />;
  }

  return <>{children}</>;
};

export default AuthProvider;
