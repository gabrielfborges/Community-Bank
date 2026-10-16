# Community Bank API

API de um banco comunitário criada com Node.js, TypeScript e Express.

## Pré-requisitos

- Node.js 22.5 ou superior
- npm

A persistência usa o SQLite nativo do Node.js e cria o arquivo `data/community-bank.db` na primeira execução.

## Instalação

```bash
npm install
```

## Executar

```bash
npm run dev
```

A API será executada em `http://localhost:3000`.

## Solicitação de crédito solidário

### POST /credit/solidarity

Registra uma solicitação de crédito para um empreendimento solidário.

Requisição:

```json
{
  "enterpriseName": "Cooperativa Sementes do Bairro",
  "enterpriseDocument": "12.345.678/0001-90",
  "requestedAmount": 5000,
  "purpose": "Compra de equipamentos para ampliar a produção",
  "termMonths": 12
}
```

A resposta de sucesso possui status HTTP `201` e status inicial `PENDING`.

Exemplo com curl:

```bash
curl -X POST http://localhost:3000/credit/solidarity \
  -H "Content-Type: application/json" \
  -d '{"enterpriseName":"Cooperativa Sementes do Bairro","enterpriseDocument":"12.345.678/0001-90","requestedAmount":5000,"purpose":"Compra de equipamentos para ampliar a produção","termMonths":12}'
```

## Outras rotas

- `GET /health`: verifica se a API está funcionando.
- `GET /accounts`: lista as contas mockadas.
- `POST /accounts`: abre uma conta mockada.

## Arquitetura hexagonal

```text
Driving Adapter: SolidarityCreditController
                |
                v
Input Port: CreateSolidarityCreditApplication
                |
                v
Use Case: CreateSolidarityCreditUseCase
                |
                v
Domain: CreditRequest + SolidarityEnterprise
                |
                v
Output Port: CreditRequestRepository
                |
                v
Driven Adapter: CreditRequestRepositoryImpl
                |
                v
Data source: SQLite (data/community-bank.db)
```

## Validação

```bash
npm run typecheck
npm run build
```