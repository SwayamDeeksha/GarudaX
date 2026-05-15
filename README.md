# GarudaX Mobile

GarudaX is a demo/MVP Expo React Native Mobile Application for an international multi-currency money transfer product.

Tagline: Fast, secure, transparent global money transfers.

## Features

- Splash, onboarding, login, register, forgot password, OTP, and biometric placeholder flows
- KYC onboarding with personal details, address details, document upload placeholder, selfie placeholder, review, and status
- Dashboard with KYC banner, wallet equivalent balance, wallet cards, exchange ticker, notifications, and recent transfers
- Multi-currency wallets for USD, EUR, GBP, INR, AED, SGD, AUD, CAD, JPY, CHF, SAR, QAR, MYR, THB
- Send-money flow with quote, FX markup, fee, tax/GST, recipient amount, risk status, beneficiary, purpose, mock payment, and tracking
- Beneficiary list, add, details, and edit screens
- Transaction history with search, status filter, currency filter, detail pages, and tracking timeline
- Currency converter with last-updated timestamp
- Notifications, profile, security settings, support tickets, FAQ, and legal disclaimer
- Mock mode fallback with demo user, wallets, exchange rates, beneficiaries, transactions, and notifications

## Tech Stack

- React Native with Expo
- TypeScript
- Expo Router
- Zustand
- React Hook Form + Zod
- Axios
- Expo SecureStore
- Reanimated
- React Native Chart Kit dependency included for charts

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and update values as needed.

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.your-garudax-backend.com
EXPO_PUBLIC_MOCK_MODE=false
EXPO_PUBLIC_ENABLE_MOCK_FALLBACK=false
```

`EXPO_PUBLIC_API_BASE_URL` is used by the Axios service layer.

Production settings:

- `EXPO_PUBLIC_MOCK_MODE=false`
- `EXPO_PUBLIC_ENABLE_MOCK_FALLBACK=false`
- Use only an HTTPS API URL.

Demo settings:

- `EXPO_PUBLIC_MOCK_MODE=true`
- `EXPO_PUBLIC_ENABLE_MOCK_FALLBACK=true` if you want a live API attempt to fall back to sandbox data during demos.

In production, backend errors are surfaced instead of silently loading mock data.

## Run

```bash
npm run start
```

Then open the app with Expo Go, an iOS simulator, an Android emulator, or Expo web.

## Backend API Connection

The production service layer is centralized in `src/services/backend.ts` and is ready for these endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/kyc/submit`
- `GET /api/kyc/status`
- `GET /api/wallets`
- `POST /api/wallets/create`
- `GET /api/wallets/:currency`
- `POST /api/wallets/mock-topup`
- `GET /api/exchange/rates`
- `GET /api/exchange/convert?from=USD&to=INR&amount=100`
- `POST /api/beneficiaries`
- `GET /api/beneficiaries`
- `GET /api/beneficiaries/:id`
- `PATCH /api/beneficiaries/:id`
- `DELETE /api/beneficiaries/:id`
- `POST /api/transfers/quote`
- `POST /api/transfers/create`
- `GET /api/transfers`
- `GET /api/transfers/:id`
- `POST /api/transfers/:id/pay`
- `POST /api/transfers/:id/cancel`
- `GET /api/reports/transactions`

Expected auth response format:

```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "Arjun Rao",
    "email": "arjun@example.com",
    "phone": "+91 98765 43210",
    "country": "India",
    "nationality": "Indian",
    "kycStatus": "Verified"
  }
}
```

The client also accepts `accessToken` or `jwt` in place of `token`.

JWTs are stored with Expo SecureStore and attached as `Authorization: Bearer <token>` on API requests.

## Demo Login

- Email: `arjun@example.com`
- Password: `DemoPass123`

Demo user: Arjun Rao, India, KYC status Verified.

## Mock Mode

Mock mode includes:

- Wallets: INR 250000, USD 3200, EUR 1500, AED 4000
- Beneficiaries: Priya Rao, Michael Smith, Ahmed Khan
- Transactions: USD to INR completed, INR to AED processing, EUR to INR compliance review
- Notifications for KYC, transfer creation, payment received, and compliance review

Mock mode is explicit. For production builds, do not enable mock fallback unless you are intentionally building a sandbox/demo artifact.

## Production Readiness Notes

- Real money movement is not enabled by default.
- Backend API calls are centralized and typed.
- API failures are not hidden in production mode.
- JWT storage uses Expo SecureStore.
- App settings and onboarding state persist locally.
- Sensitive account and ID values are masked in UI components.
- Transfer quotes include risk routing placeholders.
- KYC submit/status calls are connected to backend endpoints.
- Manual review is triggered above the equivalent of 5,000 USD in sandbox logic.

## Compliance Disclaimer

GarudaX is a demo fintech platform built for educational and product demonstration purposes. Real international money transfer services require licenses, banking partners, AML/KYC compliance, regulatory approvals, and jurisdiction-specific legal review.

Real money movement is disabled by default. Use mock/sandbox APIs unless regulated provider keys, banking partners, compliance workflows, and legal approvals are supplied.
