import express from "express";

type Account = {
  id: string;
  nome: string;
  saldo: number;
};

const accounts: Account[] = [
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

export const app = express();

app.use(express.json());

app.get("/", (_request, response) => {
  return response.status(200).json({
    message: "Community Bank API"
  });
});

app.get("/health", (_request, response) => {
  return response.status(200).json({
    status: "ok"
  });
});

app.get("/accounts", (_request, response) => {
  return response.status(200).json(accounts);
});