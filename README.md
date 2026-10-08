# Community Bank API

API de um banco comunitário criada com Node.js, TypeScript e Express.

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

A API será executada em `http://localhost:3000`.

## Rotas

### GET /health

Verifica se a API está funcionando.

```json
{
  "status": "ok"
}
```

### GET /accounts

Retorna a lista de contas mockadas.

### POST /accounts

Abre uma nova conta.

Exemplo de requisição:

```json
{
  "nome": "Maria Oliveira",
  "saldoInicial": 100
}
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

## Organização arquitetural

O projeto combina cliente-servidor, MVC e organização em camadas:

```text
Cliente HTTP
    |
    v
Routes -> Controller -> Service -> Domain -> Repository -> Dados em memória
```

- `routes`: define os caminhos HTTP.
- `controllers`: recebe a requisição e devolve a resposta JSON.
- `services`: aplica as regras do caso de uso.
- `domain`: representa as entidades do sistema.
- `repositories`: acessa e altera os dados.
- `app.ts`: conecta as partes da aplicação.
- `server.ts`: inicia o servidor.