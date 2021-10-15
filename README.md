# PetCRUD

## Sobre o projeto

O PetCRUD é uma simples aplicação de CRUD Web onde é possível cadastrar uma lista de animais, tendo suas respectivas informações, como: Data de nascimento, nome, tipo e peso. Temos a possibilidade de criar um novo animal, editar um animal já existente, e também deletar.

Este projeto foi desenvolvido com base em um teste de processo seletivo de um Estágio.

---
## Tecnologias utilizadas

Nessa aplicação foram utilizados como tecnologias: 

- React
- Redux Thunk
- Axios
- SASS
- Asp.Net MVC
- MongoDB

---
## Como instalar e utilizar o projeto

OBS: É necessário ter instalado o .Net 5.0 para o Backend, o MongoDB para o Banco de dados e o yarn/npm para o Frontend.

Para configurar a API Backend:
* Criar um Banco de Dados no MongoDB com o nome *"AnimalCRUD"* ou de sua escolha;
* Criar uma Coleção no Banco com o nome *"Animal"* ou de sua escolha;
* Vá em *"Backend/appsettings.json"*, em *"DatabaseSettings"*, caso a sua Conexão, Banco e Coleção estão diferentes do padrão, é necessário alterá-las;
* Abra o terminal na pasta *"Backend"*;
* Execute o comando: dotnet restore;
* Execute o comando: dotnet run.

Para configurar o Frontend:
* Abra o terminal na pasta *"Frontend"*;
* Execute o comando: yarn install;
* Execute o comando: yarn start.

Pronto !!! O projeto está configurado, basta utilizar o link gerado pelo frontend e agora está pronto para ser utilizado.
