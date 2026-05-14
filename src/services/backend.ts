import { api, tokenStorage, withMockFallback } from "@/services/api";
import { mockApi } from "@/services/mockApi";
import { Beneficiary, CurrencyCode, KycStatus, Quote, Transaction, User, Wallet } from "@/types";

type AuthResponse = {
  token?: string;
  accessToken?: string;
  jwt?: string;
  user: User;
};

const normalizeAuth = (response: AuthResponse) => {
  const token = response.token || response.accessToken || response.jwt;
  if (!token) throw new Error("Authentication response did not include a token");
  return { token, user: response.user };
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  governmentIdType: string;
  governmentIdNumber: string;
};

export type KycSubmissionPayload = {
  personalDetails?: Record<string, unknown>;
  addressDetails?: Record<string, unknown>;
  documentUploadAcknowledged?: boolean;
  selfieVerificationAcknowledged?: boolean;
};

export const backend = {
  auth: {
    async login(email: string, password: string) {
      return withMockFallback(
        async () => normalizeAuth((await api.post<AuthResponse>("/api/auth/login", { email, password })).data),
        async () => mockApi.login(email)
      );
    },
    async register(payload: RegisterPayload) {
      return withMockFallback(
        async () => normalizeAuth((await api.post<AuthResponse>("/api/auth/register", payload)).data),
        async () => mockApi.register()
      );
    },
    async logout() {
      await api.post("/api/auth/logout").catch(() => undefined);
      await tokenStorage.clear();
    },
    async me() {
      return withMockFallback(
        async () => (await api.get<User>("/api/auth/me")).data,
        async () => mockApi.me()
      );
    }
  },
  kyc: {
    async submit(payload: KycSubmissionPayload) {
      return withMockFallback(
        async () => (await api.post<{ status: KycStatus }>("/api/kyc/submit", payload)).data,
        async () => ({ status: "Pending" as KycStatus })
      );
    },
    async status() {
      return withMockFallback(
        async () => (await api.get<{ status: KycStatus }>("/api/kyc/status")).data,
        async () => ({ status: "Verified" as KycStatus })
      );
    }
  },
  wallets: {
    async list() {
      return withMockFallback(
        async () => (await api.get<Wallet[]>("/api/wallets")).data,
        async () => mockApi.wallets()
      );
    },
    async create(currency: CurrencyCode) {
      return withMockFallback(
        async () => (await api.post<Wallet>("/api/wallets/create", { currency })).data,
        async () => ({ currency, flag: currency.slice(0, 2), availableBalance: 0, pendingBalance: 0 })
      );
    },
    async get(currency: CurrencyCode) {
      return withMockFallback(
        async () => (await api.get<Wallet>(`/api/wallets/${currency}`)).data,
        async () => (await mockApi.wallets()).find((wallet) => wallet.currency === currency) || { currency, flag: currency.slice(0, 2), availableBalance: 0, pendingBalance: 0 }
      );
    },
    async mockTopup(currency: CurrencyCode, amount: number) {
      return withMockFallback(
        async () => (await api.post<Wallet>("/api/wallets/mock-topup", { currency, amount })).data,
        async () => ({ currency, flag: currency.slice(0, 2), availableBalance: amount, pendingBalance: 0 })
      );
    }
  },
  exchange: {
    async rates() {
      return withMockFallback(
        async () => (await api.get<Record<string, number>>("/api/exchange/rates")).data,
        async () => mockApi.rates()
      );
    },
    async convert(from: CurrencyCode, to: CurrencyCode, amount: number) {
      return withMockFallback(
        async () => (await api.get<{ rate: number; convertedAmount: number; fee: number; updatedAt: string }>("/api/exchange/convert", { params: { from, to, amount } })).data,
        async () => mockApi.convert(from, to, amount)
      );
    }
  },
  beneficiaries: {
    async list() {
      return withMockFallback(
        async () => (await api.get<Beneficiary[]>("/api/beneficiaries")).data,
        async () => mockApi.beneficiaries()
      );
    },
    async create(input: Omit<Beneficiary, "id">) {
      return withMockFallback(
        async () => (await api.post<Beneficiary>("/api/beneficiaries", input)).data,
        async () => mockApi.createBeneficiary(input)
      );
    },
    async update(id: string, input: Partial<Beneficiary>) {
      return withMockFallback(
        async () => (await api.patch<Beneficiary>(`/api/beneficiaries/${id}`, input)).data,
        async () => ({ ...(await mockApi.beneficiaries()).find((beneficiary) => beneficiary.id === id), ...input } as Beneficiary)
      );
    },
    async remove(id: string) {
      await withMockFallback(
        async () => {
          await api.delete(`/api/beneficiaries/${id}`);
        },
        async () => undefined
      );
    }
  },
  transfers: {
    async quote(sourceCurrency: CurrencyCode, destinationCurrency: CurrencyCode, amount: number) {
      return withMockFallback(
        async () => (await api.post<Quote>("/api/transfers/quote", { sourceCurrency, destinationCurrency, amount })).data,
        async () => mockApi.quote(sourceCurrency, destinationCurrency, amount)
      );
    },
    async create(payload: { quote: Quote; beneficiary: Beneficiary; purpose: string; sourceOfFunds?: string }) {
      return withMockFallback(
        async () => (await api.post<Transaction>("/api/transfers/create", payload)).data,
        async () => mockApi.createTransfer({ quote: payload.quote, beneficiaryName: payload.beneficiary.fullName, purpose: payload.purpose })
      );
    },
    async list() {
      return withMockFallback(
        async () => (await api.get<Transaction[]>("/api/transfers")).data,
        async () => mockApi.transactions()
      );
    },
    async get(id: string) {
      return withMockFallback(
        async () => (await api.get<Transaction>(`/api/transfers/${id}`)).data,
        async () => (await mockApi.transactions()).find((transaction) => transaction.id === id)
      );
    },
    async pay(id: string) {
      return withMockFallback(
        async () => (await api.post<Transaction>(`/api/transfers/${id}/pay`)).data,
        async () => undefined
      );
    },
    async cancel(id: string) {
      return withMockFallback(
        async () => (await api.post<Transaction>(`/api/transfers/${id}/cancel`)).data,
        async () => ({ ...((await mockApi.transactions()).find((transaction) => transaction.id === id) as Transaction), status: "Cancelled" })
      );
    },
    async reports() {
      return withMockFallback(
        async () => (await api.get<Transaction[]>("/api/reports/transactions")).data,
        async () => mockApi.transactions()
      );
    }
  },
  notifications: {
    async list() {
      return withMockFallback(
        async () => (await api.get("/api/notifications")).data,
        async () => mockApi.notifications()
      );
    }
  }
};
