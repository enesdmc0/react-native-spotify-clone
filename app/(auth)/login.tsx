import { login } from "@/utils/actions";
import { LoginFormData, loginSchema } from "@/utils/schema";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { z } from "zod";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";


const Login = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(form);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handlePress = useCallback(async () => {
    try {
      Keyboard.dismiss();

      if (!validateForm()) {
        toast.error("Please fill all fields");
        return;
      }

      setLoading(true);

      const response = await login(form.email, form.password);

      if (response.success) {
        toast.success(response.message);
        router.replace("/(root)/(tabs)/home");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }, [form]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="bg-s-dark1 min-h-screen p-6 flex">
        <View>
          <Text className="text-3xl font-semibold text-white">
            Email or username
          </Text>
          <TextInput
            value={form.email}
            onChangeText={(value) => {
              setForm({ ...form, email: value });
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            autoCorrect={false}
            editable={!loading}
            autoComplete="email"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
          />
          {errors.email ? (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          ) : null}
        </View>
        <View className="mt-10">
          <Text className="text-3xl font-semibold text-white">Password</Text>
          <TextInput
            value={form.password}
            onChangeText={(value) => {
              setForm({ ...form, password: value });
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            className="bg-[#717171] rounded-md h-14 px-5 font-semibold flex items-center text-white mt-1"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            returnKeyType="done"
            editable={!loading}
            onSubmitEditing={handlePress}
          />
          {errors.password ? (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          ) : null}
        </View>

        <View className="flex items-center mt-16 gap-5">
          <TouchableOpacity
            onPress={handlePress}
            disabled={loading || !form.email || !form.password}
            className={`rounded-full  bg-white text-black px-11 py-5 ${
              loading ? "opacity-70" : ""
            } `}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text className="text-xl font-bold ">Log in</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            className="rounded-full  border border-[#686868] px-7 py-2 "
          >
            <Text className="text-white">Log in without password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
