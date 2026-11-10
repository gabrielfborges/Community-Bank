# ADR-0001 - Adotar arquitetura hexagonal no módulo de crédito

- Status: Accepted

## Contexto

O módulo de solicitação de crédito precisa preservar regras de negócio mesmo quando a API HTTP ou a forma de persistência mudar. O sistema possui requisitos de confiabilidade, manutenibilidade, evolução e integridade financeira. O projeto também precisa demonstrar explicitamente Input Port, Output Port, caso de uso e adaptadores.

Foram consideradas uma implementação direta no Controller e uma organização em camadas tradicional. A implementação direta seria menor, mas misturaria HTTP, regras e banco. A organização em camadas separaria responsabilidades, mas não deixaria tão explícita a inversão de dependência do núcleo.

## Decisão

Adotar Arquitetura Hexagonal no módulo de crédito solidário. O caso de uso depende de uma porta de entrada para definir seu contrato e de uma porta de saída para persistir solicitações. O Controller Express será o Driving Adapter e o repositório SQLite será o Driven Adapter.

## Consequências

### Positivas

- O caso de uso não depende de Express ou SQLite.
- As regras podem ser testadas sem subir servidor ou banco.
- A persistência pode ser trocada por PostgreSQL sem alterar o caso de uso.
- A arquitetura evidencia as fronteiras do domínio financeiro.

### Negativas e riscos

- Há mais arquivos, interfaces e configurações.
- Para uma API pequena, existe um custo inicial de abstração.
- É necessário manter as dependências apontando para o núcleo e evitar regras diretamente no Controller.