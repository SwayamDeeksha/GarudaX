import { CurrencyCode } from "@/types";

export const formatMoney = (value: number, currency: CurrencyCode) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2
  }).format(value);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(iso));

export const maskAccount = (value: string) => value.replace(/\s/g, "").replace(/.(?=.{4})/g, "•");

export const maskId = (value: string) => value.replace(/.(?=.{3})/g, "•");

export const makeId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
