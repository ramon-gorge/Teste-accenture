import { faker } from '@faker-js/faker';
import '@4tw/cypress-drag-drop';

beforeEach(() => {
    cy.on('uncaught:exception', () => false);
});

Cypress.Commands.add('preencherPracticeForm', () => {
    cy.visit('https://demoqa.com/')
    //cria usuario usando a biblioteca faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const text = faker.lorem.words(3);
    const address = faker.location.streetAddress();
    cy.contains('Forms').click();
    cy.contains('Practice Form').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.contains('label', 'Other').click();
    cy.get('#userNumber').type('1234567896');
    cy.get('#dateOfBirthInput')
        .click()
        .type('{backspace}{backspace}{backspace}{backspace}') // workaround para limpar o campo de data sem crashar a tela
        .type('1990{enter}');
    cy.get('#subjectsInput')
        .click()
        .type(text)
    cy.contains('label', 'Sports').click();
    cy.get('#currentAddress').type(address);
    cy.get('.css-yk16xz-control > .css-1wy0on6 > .css-tlfecz-indicatorContainer')
        .click()
        .get('#react-select-3-option-0')
        .click();
    cy.get('#uploadPicture').selectFile('cypress/fixtures/arquivo-automacao.txt');
    cy.get('#city > .css-yk16xz-control > .css-1wy0on6 > .css-tlfecz-indicatorContainer')
        .click()
        .get('#react-select-4-option-0')
        .click();
    cy.get('#submit').click();
});

Cypress.Commands.add('alerstsAndFrames', () => {
    cy.visit('https://demoqa.com/')
    cy.contains('Alerts, Frame & Windows').click();
    cy.contains('Browser Windows').click();
    // Preparação do Stub (epião) logo antes de abrir a janela
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
    });
    // abrir a janela
    cy.get('#windowButton').click();
});

Cypress.Commands.add('registrarUsuario', () => {
    cy.visit('https://demoqa.com/')
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const age = faker.number.int({ min: 18, max: 99 }).toString();
    const salary = faker.number.int({ min: 1000, max: 10000 }).toString();
    const department = faker.commerce.department();
    cy.contains('Elements').click();
    cy.contains('Web Tables').click();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    // salvar usuario para usar posteriormente
    const user = { firstName, lastName, email, age, salary, department };
    Cypress.env('registeredUser', user);


});

Cypress.Commands.add('editarUsuario', () => {
    cy.get(':nth-child(4) > .rt-tr > :nth-child(7)').find('[title="Edit"]').click({ force: true });
    //criar novos dados para editar
    const eFirstName = 'EditedName';
    const eLastName = 'EditedLastName';
    const eEmail = 'new_email@test.com';
    cy.get('#firstName').clear().type(eFirstName);
    cy.get('#lastName').clear().type(eLastName);
    cy.get('#userEmail').clear().type(eEmail);
    cy.get('#submit').click();
    // salvar usuario editado para usar posteriormente
    const editedUser = { eFirstName, eLastName, eEmail };
    Cypress.env('newRegisteredUser', editedUser);
    return cy.wrap(editedUser);
});

Cypress.Commands.add('deletarUsuario', () => {
    cy.get(':nth-child(4) > .rt-tr > :nth-child(7) > .action-buttons')
        .find('[title="Delete"]')
        .click({ force: true });
});

Cypress.Commands.add('progressBar25', () => {
    cy.visit('https://demoqa.com/')
    cy.contains('Widgets').click();
    cy.contains('Progress Bar').click();
    cy.get('#startStopButton').click();
    cy.get('.progress-bar').should('have.attr', 'aria-valuenow', '24');
    cy.get('#startStopButton').click();
});

Cypress.Commands.add('progressBar100', () => {
    cy.get('#startStopButton').click();
    cy.get('.progress-bar', { timeout: 20000 }).should($el => {
        const n = Number($el.attr('aria-valuenow'));
        expect(n).to.eq(100);
    });
});

Cypress.Commands.add('acessarSortable', () => {
    cy.visit('https://demoqa.com/')
    cy.contains('Interactions').click({ force: true });
    cy.contains('Sortable').click();
});

Cypress.Commands.add('ordenarListaCrescente', () => {
    // reordenar lista colocando o item "One" na posição do item "Two"
    cy.contains('.list-group-item', 'One').drag(
        cy.contains('.list-group-item', 'Two'),
        { position: 'bottom' }
    );
});