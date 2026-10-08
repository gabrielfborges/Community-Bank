import type { Request, Response } from "express";
import { AccountService, ValidationError } from "../services/accountService.js";

export class AccountController {
  constructor(private readonly service: AccountService) {}

  list = (_request: Request, response: Response) => {
    return response.status(200).json(this.service.listAccounts());
  };

  create = (request: Request, response: Response) => {
    try {
      const account = this.service.createAccount(request.body);
      return response.status(201).json(account);
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json({ error: error.message });
      }

      return response.status(500).json({ error: "Erro interno ao criar a conta." });
    }
  };
}