import express from "express";
import { SolidarityCreditController } from "./adapters/in/web/solidarityCreditController.js";
import { CreditRequestRepositoryImpl } from "./adapters/out/persistence/creditRequestRepositoryImpl.js";
import { CreateSolidarityCreditUseCase } from "./application/useCases/createSolidarityCreditUseCase.js";
import { createSqliteDatabase } from "./infrastructure/database/sqliteDatabase.js";
import { AccountController } from "./controllers/accountController.js";
import { InMemoryAccountRepository } from "./repositories/accountRepository.js";
import { createAccountRoutes } from "./routes/accountRoutes.js";
import { AccountService } from "./services/accountService.js";

export const app = express();

const accountRepository = new InMemoryAccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

const database = createSqliteDatabase();
const creditRequestRepository = new CreditRequestRepositoryImpl(database);
const createSolidarityCreditUseCase = new CreateSolidarityCreditUseCase(
  creditRequestRepository
);
const solidarityCreditController = new SolidarityCreditController(
  createSolidarityCreditUseCase
);

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

app.use("/accounts", createAccountRoutes(accountController));
app.post("/credit/solidarity", solidarityCreditController.handle);