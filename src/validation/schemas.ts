import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;
const swiftRegex = /^[A-Z0-9]{6,11}$/i;
const routingRegex = /^[A-Z0-9-]{5,18}$/i;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
    password: z.string().min(10, "Use at least 10 characters").regex(/[A-Z]/, "Add an uppercase letter").regex(/[0-9]/, "Add a number"),
    confirmPassword: z.string(),
    country: z.string().min(2, "Country is required"),
    nationality: z.string().min(2, "Nationality is required"),
    dateOfBirth: z.string().min(8, "Date of birth is required"),
    address: z.string().min(8, "Address is required"),
    governmentIdType: z.string().min(2, "Government ID type is required"),
    governmentIdNumber: z.string().min(4, "Government ID number is required"),
    terms: z.boolean().refine(Boolean, "Accept terms to continue")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export const kycPersonalSchema = z.object({
  fullName: z.string().min(2),
  dateOfBirth: z.string().min(8),
  nationality: z.string().min(2),
  occupation: z.string().min(2),
  governmentIdType: z.string().min(2),
  governmentIdNumber: z.string().min(4)
});

export const kycAddressSchema = z.object({
  address: z.string().min(8),
  city: z.string().min(2),
  country: z.string().min(2),
  postalCode: z.string().min(3)
});

export const beneficiarySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  country: z.string().min(2),
  currency: z.string().min(3),
  bankName: z.string().min(2),
  accountNumber: z.string().min(6),
  swiftCode: z.string().regex(swiftRegex, "Use a valid SWIFT/BIC format"),
  routingCode: z.string().regex(routingRegex, "Use a valid routing/IFSC/sort code"),
  bankAddress: z.string().min(6),
  relationship: z.string().min(2),
  purposeCategory: z.string().min(2)
});

export const amountSchema = z.object({
  sourceCurrency: z.string().min(3),
  destinationCurrency: z.string().min(3),
  amount: z.coerce.number().min(10, "Minimum transfer is equivalent of 10 USD")
}).refine((data) => data.sourceCurrency !== data.destinationCurrency, {
  path: ["destinationCurrency"],
  message: "Choose a different destination currency"
});

export const purposeSchema = z.object({
  purpose: z.string().min(2),
  sourceOfFunds: z.string().min(2),
  note: z.string().optional()
});
