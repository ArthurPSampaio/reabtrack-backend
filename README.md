# 🔗 ReabTrack Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0C2C.svg?style=for-the-badge&logo=typeorm&logoColor=white)

> **O núcleo de orquestração e regras de negócio.**

Este é o backend principal do ecossistema **ReabTrack**. Construído sobre o framework NestJS, ele atua como a fonte da verdade para os dados clínicos e o orquestrador entre o aplicativo móvel e o microsserviço de Inteligência Artificial.

## 🧠 Arquitetura e Design

O sistema segue uma arquitetura modular baseada em serviços:

* **Gestão de Dados:** Persistência robusta de Pacientes, Planos e Histórico Clínico utilizando PostgreSQL.
* **Event-Driven (Eventos):** Utiliza `EventEmitter` para disparar processos assíncronos (ex: quando um registro é criado, ele é automaticamente enviado para indexação vetorial na IA).
* **API RESTful:** Endpoints padronizados e tipados para consumo do mobile.

## 🛠️ Stack Tecnológica

* **Framework:** NestJS (Node.js)
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM
* **Comunicação Externa:** Axios (para falar com a IA Python)

## ⚡ Instalação e Execução

1.  **Clone e instale:**
    ```bash
    git clone [https://github.com/seu-usuario/reabtrack-backend.git](https://github.com/seu-usuario/reabtrack-backend.git)
    npm install
    ```

2.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=sua_senha
    DB_NAME=reabtrack
    AI_API_URL=http://localhost:8000
    AI_API_KEY=sua_chave_interna
    ```

3.  **Execute:**
    ```bash
    # Desenvolvimento
    npm run start:dev
    ```

---
Desenvolvido por **Arthur Sampaio** | TCC 2025