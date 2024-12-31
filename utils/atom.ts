import { RegisterForm } from "@/types";
import { atom } from "jotai";




export const registerFormAtom = atom<RegisterForm>({
    email: "",
    password: "",
    gender: "",
    birthday: "",
})

export const tokenAtom = atom<string | null>(null)