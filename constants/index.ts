import { User } from "@/types";
import images from "./images";

export const AUTH_KEYS = {
    USER_TOKEN: 'userToken',
    // TODO: Add JWT_SECRET to .env file
    JWT_SECRET: process.env.EXPO_PUBLIC_JWT_SECRET,
} as const;


export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const welcomeData = [
    {
        icon: images.google,
        title: "Continue with Google",
    },
    {
        icon: images.facebook,
        title: "Continue with Facebook",
    },
    {
        icon: images.apple,
        title: "Continue with Apple",
    },
];


export const mockUsers: User[] = [
    {
        id: 1,
        email: 'test@gmail.com',
        password: '&&||123456||&&',
        gender: 'male',
        birthday: '12.12.2024'
    },
    {
        id: 2,
        email: 'test1@gmail.com',
        password: '&&||123456||&&',
        gender: 'female',
        birthday: '12.12.2024'
    }
];
