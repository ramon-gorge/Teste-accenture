import { faker } from '@faker-js/faker';

//TESTES NEGATIVOS
Cypress.Commands.add('senhaInvalida', () => {
    const userName = faker.person.firstName();
    Cypress.env('userName', userName);
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/User',
        body: {
            "userName": userName,
            "password": "senha1234"  // senha inválida, não atende aos requisitos
        },
        failOnStatusCode: false // para previnir falha automática no teste
    }).then((response) => { return response });
});

Cypress.Commands.add('usuarioInvalido', () => {
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/User',
        body: {
            "userName": "",
            "password": "P@ass1234"
        },
        failOnStatusCode: false
    }).then((response) => { return response });
});

Cypress.Commands.add('validarUsuarioInexsitente', () => {
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Authorized',
        body: {
            "userName": "teste",
            "password": "senha1234"
        },
        failOnStatusCode: false
    }).then((response) => { return response });
});

Cypress.Commands.add('alugarLivrosUsuarioNaoAutenticado', () => {
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/BookStore/v1/Books',
        body: {
            userId: Cypress.env('userID'),
            collectionOfIsbns: [
                { isbn: '9781449325862' },
                { isbn: '9781449331818' }
            ]
        },
        failOnStatusCode: false
    }).then((response) => { return response });
});

//TESTES POSITIVOS
Cypress.Commands.add('criarUsuarioApi', () => {
    // cria usuario usando a bibilioteca faker
    const userName = faker.person.firstName();
    // Workaround para criar senha com os requisitos especificos
    // minimo uma letra minuscula, minimo uma letra maiuscula, minimo um digito, minimo um caractere especial
    // minimo 8 caracteres
    const lower = faker.string.alpha({ length: 1, casing: 'lower' });
    const upper = faker.string.alpha({ length: 1, casing: 'upper' });
    const digit = faker.string.numeric(1);
    const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*']);
    const rest = faker.internet.password(4, false);
    const password = lower + upper + digit + special + rest;
    // armazena usuario e senha em variaveis de ambiente
    Cypress.env('userName', userName);
    Cypress.env('password', password);
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/User',
        body: {
            "userName": userName,
            "password": password
        }
    }).then((response) => {
        Cypress.env('userID', response.body.userID);  // salva o userID na variavel de ambiente
        return response;
    });
});

Cypress.Commands.add('gerarToken', () => {
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/GenerateToken',
        body: {
            "userName": Cypress.env('userName'),
            "password": Cypress.env('password')
        }
    }).then((response) => {
        Cypress.env('token', response.body.token); // salva o token na variavel de ambiente
        return response;
    });
});

Cypress.Commands.add('validarUsuario', () => {
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Authorized',
        body: {
            "userName": Cypress.env('userName'),
            "password": Cypress.env('password')
        }
    }).then((response) => { return response });
});

Cypress.Commands.add('listarLivros', () => {
    cy.api({
        method: 'GET',
        url: 'https://demoqa.com/BookStore/v1/Books'
    }).then((response) => { return response });
});

Cypress.Commands.add('alugarLivros', () => {
    cy.api({
        method: 'POST',
        url: 'https://demoqa.com/BookStore/v1/Books',
        headers: {
            Authorization: 'Bearer ' + Cypress.env('token')
        },
        body: {
            userId: Cypress.env('userID'),
            collectionOfIsbns: [
                { isbn: '9781449325862' },
                { isbn: '9781449331818' }
            ]
        }
    }).then((response) => { return response });
});

Cypress.Commands.add('listarLivrosParaUsuario', () => {
    cy.api({
        method: 'GET',
        url:  `https://demoqa.com/Account/v1/User/${Cypress.env('userID')}`,
        headers: {
            Authorization: 'Bearer ' + Cypress.env('token')
        }
    }).then((response) => { return response });
});