import { mockBeneficiaries, mockNotifications, mockRates, mockTransactions, mockWallets, demoUser } from "@/data/mock";
import { Beneficiary, CurrencyCode, Quote, Transaction } from "@/types";
import { makeId } from "@/lib/format";

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const usdEquivalent = (amount: number, currency: CurrencyCode) => {
  if (currency === "USD") return amount;
  const direct = mockRates[`${currency}_USD`];
  if (direct) return amount * direct;
  const toInr = currency === "INR" ? 1 : mockRates[`${currency}_INR`] || 80;
  return (amount * toInr) / 83.12;
};

export const mockApi = {
  async login(email: string) {
    await wait();
    return { token: "mock.jwt.sandbox.token", user: { ...demoUser, email } };
  },
  async register() {
    await wait();
    return { token: "mock.jwt.sandbox.token", user: demoUser };
  },
  async me() {
    await wait();
    return demoUser;
  },
  async wallets() {
    await wait();
    return mockWallets;
  },
  async rates() {
    await wait();
    return mockRates;
  },
  async convert(from: CurrencyCode, to: CurrencyCode, amount: number) {
    await wait();
    const rate = from === to ? 1 : mockRates[`${from}_${to}`] || (mockRates[`${from}_INR`] || 83.12) / (mockRates[`${to}_INR`] || 83.12);
    const fee = Math.max(amount * 0.006, 2);
    return { rate, convertedAmount: amount * rate, fee, updatedAt: new Date().toISOString() };
  },
  async quote(sourceCurrency: CurrencyCode, destinationCurrency: CurrencyCode, sendAmount: number): Promise<Quote> {
    const converted = await this.convert(sourceCurrency, destinationCurrency, sendAmount);
    const fxMarkup = sendAmount * 0.004;
    const transferFee = Math.max(sendAmount * 0.008, 3);
    const tax = transferFee * 0.18;
    const usd = usdEquivalent(sendAmount, sourceCurrency);
    return {
      sourceCurrency,
      destinationCurrency,
      sendAmount,
      exchangeRate: converted.rate,
      fxMarkup,
      transferFee,
      tax,
      totalPayable: sendAmount + transferFee + tax,
      recipientGets: converted.convertedAmount - fxMarkup * converted.rate,
      estimatedDelivery: usd > 5000 ? "1-2 business days after compliance review" : "Minutes to 1 business day",
      risk: usd > 10000 ? "High Risk" : usd > 5000 ? "Medium Risk" : "Low Risk"
    };
  },
  async beneficiaries() {
    await wait();
    return mockBeneficiaries;
  },
  async createBeneficiary(input: Omit<Beneficiary, "id">) {
    await wait();
    return { ...input, id: makeId("ben") };
  },
  async transactions() {
    await wait();
    return mockTransactions;
  },
  async createTransfer(input: { quote: Quote; beneficiaryName: string; purpose: string }): Promise<Transaction> {
    await wait();
    return {
      id: makeId("txn"),
      sourceCurrency: input.quote.sourceCurrency,
      destinationCurrency: input.quote.destinationCurrency,
      amount: input.quote.sendAmount,
      recipientGets: input.quote.recipientGets,
      beneficiaryName: input.beneficiaryName,
      status: input.quote.risk === "Low Risk" ? "Awaiting Payment" : "Compliance Review",
      createdAt: new Date().toISOString(),
      purpose: input.purpose,
      reference: `GX-${input.quote.sourceCurrency}${input.quote.destinationCurrency}-${Date.now().toString().slice(-4)}`
    };
  },
  async notifications() {
    await wait();
    return mockNotifications;
  }
};
