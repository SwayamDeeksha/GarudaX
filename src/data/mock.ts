import { Beneficiary, NotificationItem, Transaction, User, Wallet } from "@/types";

export const demoUser: User = {
  id: "usr_demo_arjun",
  name: "Arjun Rao",
  email: "arjun@example.com",
  phone: "+91 98765 43210",
  country: "India",
  nationality: "Indian",
  kycStatus: "Verified"
};

export const mockWallets: Wallet[] = [
  { currency: "INR", flag: "IN", availableBalance: 250000, pendingBalance: 12000 },
  { currency: "USD", flag: "US", availableBalance: 3200, pendingBalance: 250 },
  { currency: "EUR", flag: "EU", availableBalance: 1500, pendingBalance: 0 },
  { currency: "AED", flag: "AE", availableBalance: 4000, pendingBalance: 300 }
];

export const mockRates: Record<string, number> = {
  USD_INR: 83.12,
  INR_USD: 0.012,
  INR_AED: 0.044,
  AED_INR: 22.64,
  EUR_INR: 90.04,
  INR_EUR: 0.011,
  USD_AED: 3.67,
  EUR_USD: 1.08,
  GBP_INR: 105.4,
  SGD_INR: 61.1,
  AUD_INR: 54.8,
  CAD_INR: 61.4,
  JPY_INR: 0.56,
  CHF_INR: 93.2,
  SAR_INR: 22.16,
  QAR_INR: 22.82,
  MYR_INR: 17.6,
  THB_INR: 2.29
};

export const mockBeneficiaries: Beneficiary[] = [
  {
    id: "ben_priya",
    fullName: "Priya Rao",
    email: "priya@example.com",
    phone: "+91 90000 11111",
    country: "India",
    currency: "INR",
    bankName: "HDFC Bank",
    accountNumber: "50100234567890",
    swiftCode: "HDFCINBB",
    routingCode: "HDFC0001234",
    bankAddress: "MG Road, Bengaluru",
    relationship: "Family",
    purposeCategory: "Family Support"
  },
  {
    id: "ben_michael",
    fullName: "Michael Smith",
    email: "michael@example.com",
    phone: "+1 555 0100",
    country: "USA",
    currency: "USD",
    bankName: "Chase Bank",
    accountNumber: "8822441180",
    swiftCode: "CHASUS33",
    routingCode: "021000021",
    bankAddress: "New York, NY",
    relationship: "Business Partner",
    purposeCategory: "Business Payment"
  },
  {
    id: "ben_ahmed",
    fullName: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
    country: "UAE",
    currency: "AED",
    bankName: "Emirates NBD",
    accountNumber: "AE070331234567890123456",
    swiftCode: "EBILAEAD",
    routingCode: "302620122",
    bankAddress: "Dubai Marina, Dubai",
    relationship: "Friend",
    purposeCategory: "Travel"
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: "txn_1001",
    sourceCurrency: "USD",
    destinationCurrency: "INR",
    amount: 1000,
    recipientGets: 82950,
    beneficiaryName: "Priya Rao",
    status: "Completed",
    createdAt: "2026-05-10T10:15:00.000Z",
    purpose: "Family Support",
    reference: "GX-USDINR-1001"
  },
  {
    id: "txn_1002",
    sourceCurrency: "INR",
    destinationCurrency: "AED",
    amount: 50000,
    recipientGets: 2190,
    beneficiaryName: "Ahmed Khan",
    status: "Processing",
    createdAt: "2026-05-12T08:20:00.000Z",
    purpose: "Travel",
    reference: "GX-INRAED-1002"
  },
  {
    id: "txn_1003",
    sourceCurrency: "EUR",
    destinationCurrency: "INR",
    amount: 6200,
    recipientGets: 555000,
    beneficiaryName: "Priya Rao",
    status: "Compliance Review",
    createdAt: "2026-05-13T06:45:00.000Z",
    purpose: "Investment",
    reference: "GX-EURINR-1003"
  }
];

export const mockNotifications: NotificationItem[] = [
  { id: "n1", title: "KYC approved", body: "Your GarudaX verification is complete.", createdAt: "2026-05-09T11:00:00.000Z", read: false, type: "kyc" },
  { id: "n2", title: "Transfer created", body: "Your USD to INR transfer was created.", createdAt: "2026-05-10T10:16:00.000Z", read: true, type: "transfer" },
  { id: "n3", title: "Payment received", body: "We received payment for GX-INRAED-1002.", createdAt: "2026-05-12T08:24:00.000Z", read: false, type: "transfer" },
  { id: "n4", title: "Transfer under review", body: "GX-EURINR-1003 is in compliance review.", createdAt: "2026-05-13T07:05:00.000Z", read: false, type: "transfer" }
];
