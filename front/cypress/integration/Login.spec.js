describe('Tests Login page', () => {
  beforeEach(() => {
    cy.clearAuthTokens();
  });

  it('should login correctly', () => {
    cy.intercept('http://localhost:3000/sign-in', { statusCode: 200 });
    cy.visit('http://localhost:3001');

    cy.get('input').eq(0).type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('input').eq(1).type('senha123').should('have.value', 'senha123');
    cy.get('button').contains('Entrar').click();

    cy.url().should('include', '/');
  });

  it('should not login due to wrong password format', () => {
    cy.intercept('http://localhost:3000/sign-in', { statusCode: 200 });
    cy.visit('http://localhost:3001');

    cy.get('input').eq(0).type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('input').eq(1).type('aaa').should('have.value', 'aaa');
    cy.get('button').contains('Entrar').click();
    cy.get('span').should('contain.text', 'A senha deve possuir no mínimo 7 caracteres.');
    cy.url().should('include', '/login');
  });

  it('should redirect to registration page', () => {
    cy.visit('http://localhost:3001');

    cy.contains('Cadastrar').click();
    cy.url().should('include', '/registro');
  });
});
