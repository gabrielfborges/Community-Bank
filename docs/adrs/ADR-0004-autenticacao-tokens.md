# ADR-0004 - Adotar autenticação baseada em tokens

- Status: Proposed

## Contexto

A API manipula dados financeiros e solicitações de crédito, portanto precisa controlar identidade, perfis e autorização. Na etapa atual, o sistema ainda não possui autenticação real. Os clientes futuros incluem aplicação web, aplicativo mobile e painel interno, que terão necessidades diferentes de acesso.

Foram consideradas sessões de servidor, JWT e um provedor externo de identidade. Sessões podem ser simples para uma aplicação web única, mas dificultam clientes mobile e múltiplas instâncias. Um provedor externo reduz a responsabilidade de armazenar credenciais, porém aumenta a dependência externa.

## Decisão

Propor o uso de tokens de acesso, preferencialmente JWT ou tokens emitidos por um provedor de identidade, com autorização por perfil. A autenticação deverá ficar em um adaptador ou middleware de entrada e não deverá ser incorporada às regras do domínio.

## Consequências

### Positivas

- Atende clientes web, mobile e painel interno.
- Permite autorização por perfil, como cliente, gerente e administrador.
- Mantém o núcleo da aplicação independente do provedor de identidade.

### Negativas e riscos

- Exige cuidado com expiração, renovação, revogação e armazenamento dos tokens.
- JWT pode dificultar revogação imediata se for usado sem uma estratégia complementar.
- A integração com provedor externo cria dependência operacional.
- A decisão ainda depende do desenho dos clientes e do modelo de identidade comunitária.