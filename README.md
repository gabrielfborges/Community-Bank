# Community Bank API

API inicial de um banco comunitário criada com Node.js, TypeScript e Express.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

A API será executada em:

```text
http://localhost:3000
```

## Rotas disponíveis

### GET /health

Verifica se a API está funcionando.

Resposta:

```json
{
  "status": "ok"
}
```

### GET /accounts

Retorna uma lista mockada de contas.

### GET /

Retorna uma mensagem de identificação da API.

## Testar as rotas

Com a API em execução:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/accounts
```

## Verificar tipos e gerar o build

```bash
npm run typecheck
npm run build
```

## Executar a versão compilada

```bash
npm start
```

A versão compilada será gerada na pasta `dist/`.

## Estrutura do projeto

```text
community-bank-api/
├── src/
│   ├── app.ts
│   └── server.ts
├── dist/
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```