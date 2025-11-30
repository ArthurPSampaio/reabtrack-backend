# 🔗 ReabTrack Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0C2C.svg?style=for-the-badge&logo=typeorm&logoColor=white)

> **O núcleo de orquestração e regras de negócio do ReabTrack.**

Este repositório contém a API RESTful que gerencia todo o fluxo de dados do sistema ReabTrack. Desenvolvido em **NestJS**, ele garante a integridade dos dados clínicos e atua como ponte entre o aplicativo móvel e o microsserviço de Inteligência Artificial.

## 🧠 Arquitetura

O sistema foi desenhado seguindo princípios de arquitetura modular e orientada a eventos:

* **Persistência Sólida:** Banco de dados **PostgreSQL** para armazenar pacientes, planos e históricos com segurança.
* **Event-Driven:** Utiliza `EventEmitter` para processamento assíncrono. Exemplo: ao salvar um registro clínico, o sistema dispara um evento que automaticamente sincroniza os dados com o motor de busca vetorial (RAG) na IA.
* **API Tipada:** Endpoints REST padronizados e documentados via DTOs.

## ⚡ Instalação e Execução

### Pré-requisitos
* Node.js (v18+)
* PostgreSQL rodando localmente

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/ArthurPSampaio/reabtrack-backend.git](https://github.com/ArthurPSampaio/reabtrack-backend.git)
    cd reabtrack-backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis:**
    Crie um arquivo `.env` na raiz com suas credenciais:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=sua_senha
    DB_NAME=reabtrack
    AI_API_URL=http://localhost:8000
    AI_API_KEY=sua_chave_interna
    ```

4.  **Rode a aplicação:**
    ```bash
    # Modo de desenvolvimento (com hot-reload)
    npm run start:dev
    ```

## 🔗 Integrações

* **Frontend Mobile:** [ReabTrack-mobile-df](https://github.com/ArthurPSampaio/ReabTrack-mobile-df)
* **AI Core:** [reabtrack-ai](https://github.com/ArthurPSampaio/reabtrack-ai)

---
Desenvolvido por **Arthur Sampaio** | TCC 2025