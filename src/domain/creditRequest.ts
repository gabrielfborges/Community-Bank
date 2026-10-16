export type SolidarityEnterprise = {
  name: string;
  document: string;
};

export type CreditRequestStatus = "PENDING";

export type CreditRequest = {
  id: string;
  enterprise: SolidarityEnterprise;
  requestedAmount: number;
  purpose: string;
  termMonths: number;
  status: CreditRequestStatus;
  createdAt: string;
};

export type CreateSolidarityCreditInput = {
  enterpriseName?: unknown;
  enterpriseDocument?: unknown;
  requestedAmount?: unknown;
  purpose?: unknown;
  termMonths?: unknown;
};