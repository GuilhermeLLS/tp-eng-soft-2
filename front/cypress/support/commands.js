Cypress.Commands.add('login', () => {
  localStorage.setItem('token', Date.now());
  localStorage.setItem('user', 'test@test.com');
});

Cypress.Commands.add('clearAuthTokens', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
});
