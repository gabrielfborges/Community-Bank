import type { CreditRequest } from "../../../domain/creditRequest.js";
import type { SqliteDatabase } from "../../../infrastructure/database/sqliteDatabase.js";
import type { CreditRequestRepository } from "../../../application/ports/out/creditRequestRepository.js";

export class CreditRequestRepositoryImpl implements CreditRequestRepository {
  constructor(private readonly database: SqliteDatabase) {}

  save(request: CreditRequest): CreditRequest {
    const statement = this.database.prepare(`
      INSERT INTO credit_requests (
        id,
        enterprise_name,
        enterprise_document,
        requested_amount,
        purpose,
        term_months,
        status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    statement.run(
      request.id,
      request.enterprise.name,
      request.enterprise.document,
      request.requestedAmount,
      request.purpose,
      request.termMonths,
      request.status,
      request.createdAt
    );

    return request;
  }
}