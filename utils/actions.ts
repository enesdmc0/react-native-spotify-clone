import * as crypto from 'expo-crypto';
import * as SecureStore from "expo-secure-store";

import { useAtomValue } from "jotai";

import type { AuthResponse, RegisterForm, User } from '../types';
import { mockUsers, EMAIL_REGEX, AUTH_KEYS } from "../constants/index";
import { tokenAtom } from './atom';

// Hash password function
export const hashPassword = async (password: string): Promise<string> => {
    try {
        return `&&||${password}||&&`;
    }
    catch (error) {
        console.log("[Error in hashPassword]: ", error);
        throw error;
    }
}

// Verify password function
export const verifyPassword = async (hashedPassword: string, password: string) => {
    const parts = hashedPassword.split("||");

    return parts.length === 3 && parts[1] === password;
}

// Generate token function
export const generateToken = async (email: string, password: string): Promise<string> => {
    if (!AUTH_KEYS.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const data = `${email}|${password}|${AUTH_KEYS.JWT_SECRET}`;
    return await crypto.digestStringAsync(
        crypto.CryptoDigestAlgorithm.SHA256,
        data
    );
};

// Register function
export const register = async (formData: RegisterForm): Promise<AuthResponse> => {
    const { email, password, gender, birthday } = formData;

    if (!email || !password || !gender || !birthday) {
        return {
            success: false,
            message: "Please fill all fields"
        };
    }

    if (!EMAIL_REGEX.test(email)) {
        return {
            success: false,
            message: "Invalid email"
        };
    }

    const existingUser = mockUsers.find((user) => user.email === email);

    if (existingUser) {
        return {
            success: false,
            message: "User already exists"
        };
    }

    const hashedPassword = await hashPassword(password);

    const newUser: User = {
        id: mockUsers.length + 1,
        email,
        password: hashedPassword,
        gender,
        birthday
    }

    mockUsers.push(newUser);

    const token = await generateToken(email, password);

    await SecureStore.setItemAsync(AUTH_KEYS.USER_TOKEN, token);

    return {
        success: true,
        message: "User created and logged in",
    };

}

// Login function
export const login = async (email: string, password: string): Promise<AuthResponse> => {

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!email || !password) {
        return {
            success: false,
            message: "Please fill all fields"
        };
    }

    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
        return {
            success: false,
            message: "User not found"
        };
    }

    const isValidPassword = await verifyPassword(user.password, password);

    if (!isValidPassword) {
        return {
            success: false,
            message: "Invalid password"
        };
    }



    if (!AUTH_KEYS.JWT_SECRET) {
        return {
            success: false,
            message: "JWT_SECRET not found"
        };
    }

    const token = await generateToken(email, password);

    await SecureStore.setItemAsync(AUTH_KEYS.USER_TOKEN, token);

    return {
        success: true,
        message: "Logged in",
    };

}

// Logout function
export const logout = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(AUTH_KEYS.USER_TOKEN);
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};

// Check if user is authenticated
export const useAuth = () => {
    const token = useAtomValue(tokenAtom);
    // TODO: Check if token is valid
    return !!token;
}







