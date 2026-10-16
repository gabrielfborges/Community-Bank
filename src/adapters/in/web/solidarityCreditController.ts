import type { Request, Response } from "express";
import type { CreateSolidarityCreditApplication } from "../../../application/ports/in/createSolidarityCreditApplication.js";
import { InvalidSolidarityCreditError } from "../../../application/useCases/createSolidarityCreditUseCase.js";

export class SolidarityCreditController {
  constructor(
    private readonly application: CreateSolidarityCreditApplication
  ) {}

  handle = (request: Request, response: Response) => {
    try {
      const creditRequest = this.application.execute(request.body);
      return response.status(201).json(creditRequest);
    } catch (error) {
      if (error instanceof InvalidSolidarityCreditError) {
        return response.status(400).json({ error: error.message });
      }

      return response.status(500).json({
        error: "Não foi possível registrar a solicitação de crédito."
      });
    }
  };
}