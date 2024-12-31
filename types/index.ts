export interface User {
  id: number;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'non-binary' | 'not-specified' | 'other' | '';
  birthday: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  gender: User['gender'];
  birthday: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface GenderOptions {
  label: string
  value: User["gender"]
}