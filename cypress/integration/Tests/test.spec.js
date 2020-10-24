/// <reference types="Cypress" />

describe('Upload', function (){
    it('Test Valid Upload', function () {
        //Upload correct test data
        cy.visit('http://localhost:4200/');
        cy.get('a').contains('Upload').click();
        const fixturePath = 'test_correct.csv';
        cy.get('[data-cy="submit"]').attachFile(fixturePath);
        cy.get('button').contains('Submit').click();
        cy.get('.uploadMsgs').contains('Successful File Upload !',{ timeout: 50000 }).should('be.visible');
        cy.get('button').contains('Close').click();
        cy.get('app-employee-list').children().
        should('contain','e0001').and('contain','hpotter')
        .and('contain','Harry Potter').and('contain','1234');


    });
});