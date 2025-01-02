import { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { registerFormAtom } from "@/utils/atom";
import { GenderOptions, User } from "@/types";
import { RegisterGenderFormData, registerGenderSchema } from "@/utils/schema";
import { z } from "zod";
import { toast } from "sonner-native";

const Gender = () => {
  const router = useRouter();

  const [form, setForm] = useAtom(registerFormAtom);

  const [errors, setErrors] = useState<Partial<RegisterGenderFormData>>({});

  const validateForm = (): boolean => {
    try {
      registerGenderSchema.parse(form);
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

  const handleGenderSelect = useCallback((gender: User["gender"]) => {
    setForm((prev) => ({ ...prev, gender }));
    if (errors.gender) {
      setErrors((prev) => ({ ...prev, gender: "" }));
    }
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleNext = () => {
    if (!validateForm()) {
      toast.error("Please select your gender");
      return;
    }
    console.log(form);
    router.push("/(auth)/(register)/birthday");
  };

  const handleOutsidePress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const genderOptions: GenderOptions[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-binary", value: "non-binary" },
    { label: "Prefer not to say", value: "not-specified" },
    { label: "Other", value: "other" },
  ];

  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View className="flex-1 bg-[#1c1c1c] p-6">
            <View>
              <Text className="text-3xl font-semibold text-white">
                What's your gender?
              </Text>

              <Pressable
                onPress={handlePresentModalPress}
                className="bg-[#717171] rounded-md h-14 px-5 justify-center mt-1"
              >
                <Text className="text-white font-semibold">
                  {form.gender
                    ? genderOptions.find((g) => g.value === form.gender)?.label
                    : "Select"}
                </Text>
              </Pressable>
            </View>

            <View className="items-center mt-16 gap-5">
              <TouchableOpacity
                onPress={handleNext}
                disabled={!form.gender}
                className="disabled:bg-[#717171] bg-white px-11 py-5 rounded-full "
              >
                <Text className="text-xl font-bold text-black">Next</Text>
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
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleGenderSelect(option.value)}
                    className={`py-4 rounded-lg ${
                      form.gender === option.value ? "bg-[#363434]" : ""
                    } `}
                  >
                    <Text className="text-white text-center font-semibold">
                      {option.label}
                    </Text>
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

export default Gender;
