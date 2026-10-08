export type Account = {
  id: string;
  nome: string;
  saldo: number;
};

export type CreateAccountInput = {
  nome?: unknown;
  saldoInicial?: unknown;
};