import type { Account, CreateAccountInput } from "../domain/account.js";
import type { AccountRepository } from "../repositories/accountRepository.js";

export class ValidationError extends Error {}

export class AccountService {
  constructor(private readonly repository: AccountRepository) {}

  listAccounts(): Account[] {
    return this.repository.list();
  }

  createAccount(input: CreateAccountInput): Account {
    const nome = typeof input.nome === "string" ? input.nome.trim() : "";
    const saldoInicial = input.saldoInicial === undefined ? 0 : input.saldoInicial;

    if (!nome) {
      throw new ValidationError("O nome do titular é obrigatório.");
    }

    if (
      typeof saldoInicial !== "number" ||
      !Number.isFinite(saldoInicial) ||
      saldoInicial < 0
    ) {
      throw new ValidationError("O saldo inicial deve ser um número maior ou igual a zero.");
    }

    const nextNumber = this.repository.list().length + 1;
    const account: Account = {
      id: `acc-${String(nextNumber).padStart(3, "0")}`,
      nome,
      saldo: saldoInicial
    };

    return this.repository.create(account);
  }
}