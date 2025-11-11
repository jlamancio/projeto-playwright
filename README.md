 <div style="background-color:#f9f9f9; padding:10px; border-radius:5px;">

# SauceDemo Playground:
Automação com utilização do framework - ***PLAYWRIGHT***
___

# 🎯 Objetivo:

Criação do portfólio de testes automatizados no GitHUB - ***[Acesso ao meu GITHUB](https://github.com/jlamancio)***
___

##  🛠️ Tecnologias:

### 📜 Linguagem principal
- Linguagem: [JavaScript - version:  (via Node.js v22.16.0)](ecma-international.org) `Neste projeto iremos utilizar o padrão ESM6`

### 🖥️ Servidor
- Server:               [Node.js    - version:  ^22.16.0](https://nodejs.org/en/) 
- Dependencies manager: [Npm        - version:  ^11.6.0](https://www.npmjs.com/)

### 🔗 API Client
- [insomnia   - version:  ^11.6.1](https://insomnia.rest/download)

### 🎨 Framework
- [Playwright - version:  ^1.56.0](https://playwright.dev/)
___

## ⚙️ Setup do projeto:
-  instalação do Node.js e Npm : https://nodejs.org/dist/v22.20.0/node-v22.20.0-x64.msi
-  instalação do playwright: npm install playwright@latest

-  Validar se as instalações estão corretas:
    -  node -v
    -  npm -v
    -  npx playwright --version

## 🧱 Arquitetura do projeto:
Arquitetura em construção. O link será adicionado em breve

## 🧪 Testes Automatizados

### ✅ - Cenários Positivos <br>
  - Login com credenciais válidas (standard_user / secret_sauce)
    - Verifica redirecionamento para /inventory
    - Valida visibilidade do título "Products"
    - Confirma que há produtos listados na página
    - 
 - Fluxo de compra e2e ( 1 item ) 
    - Verifica redirecionamento para /inventory
    - Valida visibilidade do título "Products"
    - Confirma que há produtos listados na página
    - seleciona produto e adiciona ao carrinho
    - valida o carrinho de compras
    - checkout
    - finaliza checkout  
### 🚫 - Cenários Negativos <br>
- Login com usuário e senha inválidos
- Login com usuário inválido e senha válida
- Login com usuário válido e senha inválida
- Login com campos de usuário e senha em branco
- Login com usuário válido e senha em branco
- Login com usuário em branco e senha válida

### ▶️ Executando os testes
 - npx playwright test  : rodar todos os testes
 - npx playwright test tests/auth/login.spec.ts : executar teste específico

</div>
 
