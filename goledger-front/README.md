<h1 align="center">Go Leadger Streaming Service </h1>

<p align="center">
  Um sistema para gestão de artistas, álbuns, músicas e playlists. 
</p>

## 💻 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu computador:

- [Node.js](https://nodejs.org) (versão v20.15.1 ou superior)
- npm (geralmente vem com o Node.js)

## 🛠️ Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias:

- Next
- Vite
- TypeScript
- Vitest
- Testing-library
- MSW
- SWC
- Tailwindcss
- Axios
- Radix
- Sonner
- Phosphor-react

## ⚙️ Configuração

Siga as instruções abaixo para configurar e executar o projeto:

1. Clone este repositório para o seu ambiente local. Você pode fazer isso executando o seguinte comando no seu terminal:
```
git clone https://github.com/matheusmagnon/goledger.git
```
2. Navegue até o diretório do projeto:
```
cd goledger/goledger-front/
```

## 🚀 Executando o Projeto

Siga as etapas abaixo para executar o projeto:

1. Instale as dependências do projeto. No diretório raiz do projeto, execute o comando:
```
npm install
```
2. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Adicione os valores necessários no .env.local

3. Inicie a aplicação localmente. No mesmo diretório, execute o comando:
```
npm run dev
```
4. Abra o seu navegador e acesse `http://localhost:3000` para visualizar o projeto em execução. Verifique também o seu terminal, pois ele pode exibir a porta específica em uso.

5. Caso queira executar os testes unitários:
```
npm run test
```