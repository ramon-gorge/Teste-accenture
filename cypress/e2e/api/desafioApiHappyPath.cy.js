describe('Desafio API', () => {
    it('Cadastrar usuario via API', () => {
        cy.criarUsuarioApi().then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.username).to.eq(Cypress.env('userName'));
            expect(response.body.userID).to.not.be.empty;
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Gerar token de acesso', () => {
        cy.gerarToken().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.token).to.not.be.empty;
            expect(response.body.expires).to.not.be.empty;
            expect(response.body.status).to.eq("Success");
            expect(response.body.result).to.eq("User authorized successfully.");
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Validar se usuario esta autorizado', () => {
        cy.validarUsuario().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq(true);
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Listar livros disponiveis', () => {
        cy.listarLivros().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.books).to.be.an('array').that.is.not.empty;
            expect(response.body.books[0].isbn).to.eq('9781449325862')
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Alugar dois livros', () => {
        cy.alugarLivros().then((response) => {
            expect(response.status).to.eq(201);
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Listar Livros do usuario', () => {
        cy.listarLivrosParaUsuario().then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        });
    });
});