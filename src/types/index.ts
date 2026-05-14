export type KycStatus = "Not Started" | "Pending" | "Verified" | "Rejected" | "Needs More Information";

export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "INR"
  | "AED"
  | "SGD"
  | "AUD"
  | "CAD"
  | "JPY"
  | "CHF"
  | "SAR"
  | "QAR"
  | "MYR"
  | "THB";

export type TransactionStatus =
  | "Draft"
  | "Awaiting Payment"
  | "Payment Received"
  | "Compliance Review"
  | "Processing"
  | "Sent to Partner Bank"
  | "Completed"
  | "Failed"
  | "Cancelled"
  | "Refunded";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  nationality: string;
  kycStatus: KycStatus;
};

export type Wallet = {
  currency: CurrencyCode;
  flag: string;
  availableBalance: number;
  pendingBalance: number;
};

export type Beneficiary = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  currency: CurrencyCode;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  routingCode: string;
  bankAddress: string;
  relationship: string;
  purposeCategory: string;
};

export type Quote = {
  sourceCurrency: CurrencyCode;
  destinationCurrency: CurrencyCode;
  sendAmount: number;
  exchangeRate: number;
  fxMarkup: number;
  transferFee: number;
  tax: number;
  totalPayable: number;
  recipientGets: number;
  estimatedDelivery: string;
  risk: "Low Risk" | "Medium Risk" | "High Risk";
};

export type Transaction = {
  id: string;
  sourceCurrency: CurrencyCode;
  destinationCurrency: CurrencyCode;
  amount: number;
  recipientGets: number;
  beneficiaryName: string;
  status: TransactionStatus;
  createdAt: string;
  purpose: string;
  reference: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  type: "kyc" | "transfer" | "security" | "support";
};

export type Ticket = {
  id: string;
  subject: string;
  status: "Open" | "In Review" | "Resolved";
  createdAt: string;
};
