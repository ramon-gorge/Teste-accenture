describe('Desafio API Negativos', () => {
    it('Criar usuario com senha invalida', () => {
        cy.senhaInvalida().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.eq("1300");
            expect(response.body.message).to.contains("Passwords must have at least one non alphanumeric");
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Criar usuario invalido', () => {
        cy.usuarioInvalido().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.eq("1200");
            expect(response.body.message).to.contains("UserName and Password required.");
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Verificar autorizcao de usuario invalido', () => {
        cy.validarUsuarioInexsitente().then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.code).to.eq("1207");
            expect(response.body.message).to.contains("User not found!");
            cy.log(JSON.stringify(response.body));
        });
    });

    it('Alugar livros para usuario nao autenticado', () => {
        cy.alugarLivrosUsuarioNaoAutenticado().then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.code).to.eq("1200");
            expect(response.body.message).to.contains("User not authorized!");
        });
    });
});