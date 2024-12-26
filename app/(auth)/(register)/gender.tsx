import React, { useCallback, useMemo, useRef } from "react";
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
import { registerFormAtom } from "@/atom";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";

const Gender = () => {
  const [form, setForm] = useAtom(registerFormAtom);
  const router = useRouter();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleGenderSelect = useCallback((gender: string) => {
    setForm((prev) => ({ ...prev, gender }));
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleNext = useCallback(() => {
    if (!form.gender) return;
    router.push("/(auth)/(register)/birthday");
  }, [form.gender, router]);

  const handleOutsidePress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const genderOptions = [
    { label: "Erkek", value: "male" },
    { label: "Kadın", value: "female" },
    { label: "Diğer", value: "other" },
    { label: "Belirtmek İstemiyorum", value: "not-specified" },
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
                    : "Seçiniz"}
                </Text>
              </Pressable>

              <Text className="text-white mt-1 text-sm">
                Profilinizde gösterilecektir.
              </Text>
            </View>

            <View className="items-center mt-16 gap-5">
              <TouchableOpacity
                onPress={handleNext}
                disabled={!form.gender}
                className={`bg-white px-11 py-5 rounded-full ${
                  !form.gender ? "bg-[#717171]" : ""
                }`}
              >
                <Text className="text-xl font-bold text-black">İleri</Text>
              </TouchableOpacity>
            </View>

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              enablePanDownToClose
              backgroundStyle={{ backgroundColor: "#282828" }}
              handleIndicatorStyle={{ backgroundColor: "#fff" }}
            >
              <BottomSheetView className="flex-1 p-4">
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleGenderSelect(option.value)}
                    className="py-4 border-b border-[#404040]"
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
