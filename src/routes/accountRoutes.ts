import { Router } from "express";
import { AccountController } from "../controllers/accountController.js";

export function createAccountRoutes(controller: AccountController): Router {
  const router = Router();

  router.get("/", controller.list);
  router.post("/", controller.create);

  return router;
}