describe('Tests Register page', () => {
  beforeEach(() => {
    cy.clearAuthTokens();
  });

  it('should register user', () => {
    cy.intercept({ url: 'http://localhost:3000/user', method: 'POST' }, { statusCode: 200 });
    cy.visit('http://localhost:3001/registro');

    cy.get('input').eq(0).type('testando').should('have.value', 'testando');
    cy.get('input').eq(1).type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('input').eq(2).type('senha123').should('have.value', 'senha123');
    cy.get('button').contains('Cadastrar').click();

    cy.url().should('include', '/');
  });

  it('should not register user due to lack of name', () => {
    cy.intercept({ url: 'http://localhost:3000/user', method: 'POST' }, { statusCode: 200 });
    cy.visit('http://localhost:3001/registro');

    cy.get('input').eq(1).type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('input').eq(2).type('senha123').should('have.value', 'senha123');
    cy.get('button').contains('Cadastrar').click();
    cy.get('span').should('contain.text', 'Nome é obrigatório.');

    cy.url().should('include', '/registro');
  });

  it('should not register user due to wrong password format', () => {
    cy.intercept({ url: 'http://localhost:3000/user', method: 'POST' }, { statusCode: 200 });
    cy.visit('http://localhost:3001/registro');

    cy.get('input').eq(0).type('testando').should('have.value', 'testando');
    cy.get('input').eq(1).type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('input').eq(2).type('1').should('have.value', '1');
    cy.get('button').contains('Cadastrar').click();
    cy.get('span').should('contain.text', 'A senha deve possuir no mínimo 7 caracteres.');

    cy.url().should('include', '/registro');
  });
});
