import { randomUUID } from "node:crypto";
import type {
  CreateSolidarityCreditInput,
  CreditRequest
} from "../../domain/creditRequest.js";
import type { CreateSolidarityCreditApplication } from "../ports/in/createSolidarityCreditApplication.js";
import type { CreditRequestRepository } from "../ports/out/creditRequestRepository.js";

export class InvalidSolidarityCreditError extends Error {}

export class CreateSolidarityCreditUseCase
  implements CreateSolidarityCreditApplication
{
  constructor(private readonly repository: CreditRequestRepository) {}

  execute(input: CreateSolidarityCreditInput): CreditRequest {
    const enterpriseName = this.text(input.enterpriseName);
    const enterpriseDocument = this.text(input.enterpriseDocument);
    const purpose = this.text(input.purpose);
    const requestedAmount = input.requestedAmount;
    const termMonths = input.termMonths;

    if (!enterpriseName) {
      throw new InvalidSolidarityCreditError(
        "O nome do empreendimento é obrigatório."
      );
    }

    if (!enterpriseDocument) {
      throw new InvalidSolidarityCreditError(
        "O documento do empreendimento é obrigatório."
      );
    }

    if (!purpose) {
      throw new InvalidSolidarityCreditError(
        "A finalidade do crédito é obrigatória."
      );
    }

    if (
      typeof requestedAmount !== "number" ||
      !Number.isFinite(requestedAmount) ||
      requestedAmount <= 0
    ) {
      throw new InvalidSolidarityCreditError(
        "O valor solicitado deve ser maior que zero."
      );
    }

    if (
      typeof termMonths !== "number" ||
      !Number.isInteger(termMonths) ||
      termMonths < 1 ||
      termMonths > 60
    ) {
      throw new InvalidSolidarityCreditError(
        "O prazo deve ser um número inteiro entre 1 e 60 meses."
      );
    }

    const request: CreditRequest = {
      id: randomUUID(),
      enterprise: {
        name: enterpriseName,
        document: enterpriseDocument
      },
      requestedAmount,
      purpose,
      termMonths,
      status: "PENDING",
      createdAt: new Date().toISOString()
    };

    return this.repository.save(request);
  }

  private text(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
  }
}