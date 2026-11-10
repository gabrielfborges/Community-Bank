# ADR-0003 - Organizar o sistema como monólito modular

- Status: Accepted

## Contexto

O Banco Comunitário possui diferentes áreas de negócio, como Accounts, Credit e futuramente Payments e Reports. Apesar disso, o projeto ainda tem poucos usuários, poucos módulos implementados. Os atributos de qualidade mais importantes são manutenibilidade, simplicidade operacional e evolução controlada.

Microserviços também foram considerados, mas foram descartados neste momento por aumentarem a complexidade de implantação, comunicação e monitoramento.

## Decisão

Organizar o sistema como um monólito modular. Cada módulo deve manter suas responsabilidades e portas bem definidas, mas todos serão executados como uma única API. O módulo de crédito seguirá a separação hexagonal, enquanto os demais módulos poderão evoluir gradualmente.

## Consequências

### Positivas

- Execução local e implantação simples.
- Menos complexidade de rede e operação.
- Comunicação interna rápida entre componentes.
- Possibilidade de extrair um módulo futuramente se houver necessidade real.

### Negativas e riscos

- Os módulos compartilham o mesmo processo e podem sofrer com uma falha comum.
- É necessário controlar dependências para evitar um monólito desorganizado.
- Escala independente por módulo não está disponível no início.