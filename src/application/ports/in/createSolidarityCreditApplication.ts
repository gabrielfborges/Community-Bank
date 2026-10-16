import type {
  CreateSolidarityCreditInput,
  CreditRequest
} from "../../../domain/creditRequest.js";

export interface CreateSolidarityCreditApplication {
  execute(input: CreateSolidarityCreditInput): CreditRequest;
}