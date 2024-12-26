import { atom } from "jotai";


interface RegisterForm {
    email: string;
    password: string;
    gender: string;
    birthday: string;
}

export const registerFormAtom = atom<RegisterForm>({
    email: "",
    password: "",
    gender: "",
    birthday: "",
})