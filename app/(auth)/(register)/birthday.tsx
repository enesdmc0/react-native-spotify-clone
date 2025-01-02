import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { useRouter } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
import { registerFormAtom, tokenAtom } from "@/utils/atom";
import {
  RegisterBirthdayFormData,
  registerBirthdaySchema,
} from "@/utils/schema";
import { z } from "zod";
import { toast } from "sonner-native";
import { register } from "@/utils/actions";

const Birthday = () => {
  const router = useRouter();
  const useSetToken = useSetAtom(tokenAtom);
  const [form, setForm] = useAtom(registerFormAtom);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterBirthdayFormData>>({});

  const validateForm = (): boolean => {
    try {
      registerBirthdaySchema.parse(form);
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleBirthdaySelect = useCallback((birthday: string) => {
    setForm((prev) => ({ ...prev, birthday }));
    if (errors.birthday) {
      setErrors((prev) => ({ ...prev, birthday: "" }));
    }
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handlePress = async () => {
    try {
      if (!validateForm()) {
        toast.error("Please select your birthday");
        return;
      }

      setLoading(true);

      const response = await register(form);

      if (response.success) {
        useSetToken(response.data?.token ?? null);
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
  };

  const handleOutsidePress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const birthdayOptions = [
    { label: "January - 1 - 2001", value: "1" },
    { label: "February - 2 - 2002", value: "2" },
    { label: "March - 3 - 2003", value: "3" },
    { label: "April - 4 - 2004", value: "4" },
    { label: "May - 5 - 2005", value: "5" },
    { label: "June - 6 - 2006", value: "6" },
    { label: "July - 7 - 2007", value: "7" },
    { label: "August - 8 - 2008", value: "8" },
    { label: "September - 9 - 2009", value: "9" },
    { label: "October - 10 - 2010", value: "10" },
    { label: "November - 11 - 2011", value: "11" },
    { label: "December - 12 - 2012", value: "12" },
  ];

  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View className="flex-1 bg-[#1c1c1c] p-6">
            <View>
              <Text className="text-3xl font-semibold text-white">
                What's your date of birth?
              </Text>

              <Pressable
                onPress={handlePresentModalPress}
                className="bg-[#717171] rounded-md h-14 px-5 justify-center mt-1"
              >
                <Text className="text-white font-semibold">
                  {form.birthday
                    ? birthdayOptions.find((b) => b.value === form.birthday)
                        ?.label
                    : "Select"}
                </Text>
              </Pressable>
            </View>

            <View className="items-center mt-16 gap-5">
              <TouchableOpacity
                onPress={handlePress}
                disabled={!form.birthday}
                className="disabled:bg-[#717171] bg-white px-11 py-5 rounded-full "
              >
                {loading ? (
                  <ActivityIndicator color="#000000" />
                ) : (
                  <Text className="text-xl font-bold text-black">Register</Text>
                )}
              </TouchableOpacity>
            </View>

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              enablePanDownToClose
              backgroundStyle={{ backgroundColor: "#282828" }}
              handleIndicatorStyle={{ backgroundColor: "#fff" }}
            >
              <BottomSheetView className="flex-1 p-4">
                {birthdayOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleBirthdaySelect(option.value)}
                    className={`py-4 px-8 rounded-lg flex flex-row ${
                      form.gender === option.value ? "bg-[#363434]" : ""
                    } `}
                  >
                    <Text className="text-white font-semibold flex-1">
                      {option.label.split("-")[0]}
                    </Text>
                    <Text className="text-white font-semibold text-center flex-1">
                      {option.label.split("-")[1]}
                    </Text>
                    <View className="flex-1 flex flex-row justify-between">
                      <Text className="w-0" />
                      <Text className="text-white font-semibold">
                        {option.label.split("-")[2]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Birthday;
