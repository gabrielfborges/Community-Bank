import type { Account } from "../domain/account.js";

export interface AccountRepository {
  list(): Account[];
  create(account: Account): Account;
}

export class InMemoryAccountRepository implements AccountRepository {
  private readonly accounts: Account[] = [
    {
      id: "acc-001",
      nome: "Ana Souza",
      saldo: 850.5
    },
    {
      id: "acc-002",
      nome: "Cláudio Santos",
      saldo: 3200
    },
    {
      id: "acc-003",
      nome: "João Oliveira",
      saldo: 120
    }
  ];

  list(): Account[] {
    return [...this.accounts];
  }

  create(account: Account): Account {
    this.accounts.push(account);
    return account;
  }
}