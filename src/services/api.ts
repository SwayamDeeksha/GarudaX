import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
const MOCK_MODE = process.env.EXPO_PUBLIC_MOCK_MODE === "true";
const MOCK_FALLBACK = process.env.EXPO_PUBLIC_ENABLE_MOCK_FALLBACK === "true";

export const runtimeConfig = {
  apiBaseUrl: API_BASE_URL,
  isMockMode: MOCK_MODE || !API_BASE_URL,
  allowMockFallback: MOCK_FALLBACK,
  isProductionApi: Boolean(API_BASE_URL && !MOCK_MODE)
};

export const isMockMode = runtimeConfig.isMockMode;

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("garudax_jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; code?: string; error?: string }>) => {
    const message = error.response?.data?.message || error.response?.data?.error || error.message || "Unable to connect to GarudaX services";
    throw new ApiError(message, error.response?.status, error.response?.data?.code, error.response?.data);
  }
);

export const tokenStorage = {
  get: () => SecureStore.getItemAsync("garudax_jwt"),
  set: (token: string) => SecureStore.setItemAsync("garudax_jwt", token),
  clear: () => SecureStore.deleteItemAsync("garudax_jwt")
};

export async function withMockFallback<T>(request: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  if (runtimeConfig.isMockMode) return fallback();
  try {
    return await request();
  } catch (error) {
    if (runtimeConfig.allowMockFallback) return fallback();
    throw error;
  }
}
