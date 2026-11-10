# ADR-0002 - Usar SQLite por meio de um adaptador de persistência

- Status: Accepted

## Contexto

A funcionalidade de crédito precisa persistir solicitações em um banco de dados. O projeto deve funcionar localmente e possui pouca infraestrutura disponível. A aplicação ainda está em uma etapa inicial, com baixo volume e sem necessidade de implantação distribuída.

Foram consideradas uma lista em memória, SQLite e PostgreSQL. A lista em memória não atende à persistência após reiniciar a aplicação. PostgreSQL seria adequado para produção, mas exigiria um serviço de banco separado para a execução local.

## Decisão

Usar SQLite local no arquivo `data/community-bank.db`. O acesso será feito exclusivamente pelo adaptador `CreditRequestRepositoryImpl`, por meio da porta `CreditRequestRepository`.

## Consequências

### Positivas

- O banco é criado localmente sem servidor externo.
- As solicitações permanecem após reiniciar a API.
- A porta de saída mantém o caso de uso independente do SQLite.
- A solução é simples para a disciplina e para testes manuais.

### Negativas e riscos

- SQLite possui limitações para alta concorrência e escalabilidade.
- O arquivo local exige cuidado com backup e compartilhamento entre ambientes.
- Uma futura migração para PostgreSQL exigirá um novo adaptador e migrações de esquema.
- O arquivo do banco não deve ser versionado no Git.