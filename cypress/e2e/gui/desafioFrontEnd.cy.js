import '@4tw/cypress-drag-drop';
describe('Desafio FrontEnd', () => {
    beforeEach(() => {
        cy.intercept({ url: /googletagmanager|google-analytics|analytics|doubleclick/ }, { statusCode: 200, body: '' }); //lidar com erros de scripts de terceiros
    });
    it('Preencher formulario de practice form', () => {
        cy.preencherPracticeForm();
        cy.contains('Practice Form').should('be.visible');
        cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form');
    });

    it('Acessar Alerts, Frame & Windows', () => {
        cy.alerstsAndFrames();

        // validar que estamos na tela certa
        cy.contains('Browser Windows').should('be.visible');

        // O stub persiste enquanto a página não for recarregada
        //Obs: devido a limitações do cypress, não é possível acessar o conteúdo da nova janela
        cy.get('@windowOpen').should('be.calledWith', '/sample');
    });

    it('CRUD de Usuário', () => {
        cy.visit('https://demoqa.com/webtables');

        // registrar usuario
        cy.registrarUsuario().then(() => {
            const user = Cypress.env('registeredUser');
            cy.get('.rt-tbody').should('contain', user.firstName);
            cy.editarUsuario();
        });

        // validar edição e deleção
        cy.then(() => {
            const editedUser = Cypress.env('newRegisteredUser');
            // valida se os dados editados aparecem 
            cy.contains('.rt-tbody', editedUser.eFirstName).should('be.visible');
            // deleção
            cy.deletarUsuario(editedUser.eFirstName);
            // valida que o registro foi removido
            cy.get('.rt-tbody').should('not.contain', editedUser.eFirstName);
        });
    });

    it('Barra de progresso', () => {
        cy.progressBar25();
        cy.get('.progress-bar')
            .should('have.attr', 'aria-valuenow')
            .then(val => expect(Number(val)).to.be.at.most(25));
        cy.progressBar100();
        cy.get('#resetButton').should('be.visible').click();
    });

    // Essa funcionalidade de drag and drop tem um comportamento instável no cypress e não funciona
    it.skip('Deve ordenar os elementos da lista via drag and drop', () => {
        cy.acessarSortable();
        cy.ordenarListaCrescente();
        // Validar a ordem inicial
        cy.get('.vertical-list-container .list-group-item').first().should('have.text', 'One');
        // Arrastar o 1 para a primeira posição
        cy.contains('.list-group-item', 'One').drag('.vertical-list-container .list-group-item:first-child', { position: 'top' });
        // Validar que o item "One" está na primeira posição
        cy.get('.vertical-list-container .list-group-item').first().should('have.text', 'One');
    });
});