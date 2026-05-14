import { CurrencyCode } from "@/types";

export const supportedCurrencies: CurrencyCode[] = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AED",
  "SGD",
  "AUD",
  "CAD",
  "JPY",
  "CHF",
  "SAR",
  "QAR",
  "MYR",
  "THB"
];

export const currencyMeta: Record<CurrencyCode, { name: string; flag: string }> = {
  USD: { name: "US Dollar", flag: "US" },
  EUR: { name: "Euro", flag: "EU" },
  GBP: { name: "British Pound", flag: "GB" },
  INR: { name: "Indian Rupee", flag: "IN" },
  AED: { name: "UAE Dirham", flag: "AE" },
  SGD: { name: "Singapore Dollar", flag: "SG" },
  AUD: { name: "Australian Dollar", flag: "AU" },
  CAD: { name: "Canadian Dollar", flag: "CA" },
  JPY: { name: "Japanese Yen", flag: "JP" },
  CHF: { name: "Swiss Franc", flag: "CH" },
  SAR: { name: "Saudi Riyal", flag: "SA" },
  QAR: { name: "Qatari Riyal", flag: "QA" },
  MYR: { name: "Malaysian Ringgit", flag: "MY" },
  THB: { name: "Thai Baht", flag: "TH" }
};

export const transferPurposes = [
  "Family Support",
  "Education",
  "Medical Expenses",
  "Business Payment",
  "Travel",
  "Investment",
  "Salary Transfer",
  "Personal Savings",
  "Other"
];

export const sourceOfFunds = ["Salary", "Business Income", "Savings", "Investment Income", "Loan", "Gift", "Other"];

export const transactionStatuses = [
  "Draft",
  "Awaiting Payment",
  "Payment Received",
  "Compliance Review",
  "Processing",
  "Sent to Partner Bank",
  "Completed",
  "Failed",
  "Cancelled",
  "Refunded"
] as const;

export const complianceDisclaimer =
  "GarudaX is a demo fintech platform built for educational and product demonstration purposes. Real international money transfer services require licenses, banking partners, AML/KYC compliance, regulatory approvals, and jurisdiction-specific legal review.";
