import express from "express";
import { AccountController } from "./controllers/accountController.js";
import { InMemoryAccountRepository } from "./repositories/accountRepository.js";
import { createAccountRoutes } from "./routes/accountRoutes.js";
import { AccountService } from "./services/accountService.js";

export const app = express();

const accountRepository = new InMemoryAccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

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