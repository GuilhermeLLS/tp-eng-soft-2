describe('Test profile page', () => {
  beforeEach(() => {
    cy.intercept(
      { url: 'http://localhost:3000/users', method: 'GET' },
      {
        content: [
          { email: 'test@test.com', name: 'test' },
          { email: 'john@gmail.com', name: 'John Lennon' },
        ],
      }
    );
    cy.intercept(
      { url: 'http://localhost:3000/kudos', method: 'GET' },
      {
        content: [
          {
            sender: { value: 'test@test.com', label: 'test' },
            date: '2022-02-12T20:30:59.943Z',
            recipient: { value: 'larasilva@gmail.com', label: 'lara silva' },
            message: 'Deu bom suas changes',
            id: '458796ee-9a3d-4731-b175-7212950a4a2a',
          },
        ],
      }
    );
    cy.login();
  });

  afterEach(() => {
    cy.clearAuthTokens();
  });

  it('should go to profile page from home page', () => {
    cy.visit('http://localhost:3001/');
    cy.contains('Perfil').click();

    cy.url().should('include', '/profile');
  });

  it('should leave profile page and go to home page', () => {
    cy.visit('http://localhost:3001/profile');
    cy.contains('Voltar').click();

    cy.url().should('include', '/');
  });
});
