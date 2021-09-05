describe('Authorization', () => {
  it('does not allow posting property without authentication', () => {
    cy.visit('/add');
    cy.get('h1').contains('401');
  });
  it('does not allow editing property without authentication', () => {
    cy.visit('/1/edit');
    cy.get('h1').contains('401');
  });
  it('does not allow accessing reports page without authentication', () => {
    cy.visit('/reports');
    cy.get('h1').contains('401');
  });
  it('does not allow accessing verified page without authentication', () => {
    cy.visit('/verify');
    cy.get('h1').contains('401');
  });
  it('allows a user to login', () => {
    cy.visit('/login');
    cy.get('input[type=email]').type('user1@example.com');
    cy.get('input[type=password]').type('useruser');
    cy.get('button[type=submit]').click();
    cy.intercept('/api/user/current').as('loginAction');
    cy.wait('@loginAction');
    cy.url().should('eq', 'http://localhost:3000/');
  });
  it('does not allow non-admin user to access reports page', () => {
    cy.intercept('/api/user/current').as('loginAction');
    cy.visit('/login');
    cy.get('input[type=email]').type('user1@example.com');
    cy.get('input[type=password]').type('useruser');
    cy.get('button[type=submit]').click();
    cy.wait('@loginAction');
    cy.visit('/reports');
    cy.get('h1').contains('401');
  });
  it('does not allow non-admin user to access verify page', () => {
    cy.intercept('/api/user/current').as('loginAction');
    cy.visit('/login');
    cy.get('input[type=email]').type('user1@example.com');
    cy.get('input[type=password]').type('useruser');
    cy.get('button[type=submit]').click();
    cy.wait('@loginAction');
    cy.visit('/verify');
    cy.get('h1').contains('401');
  });
  it('allows admin user to access reports page', () => {
    cy.intercept('/api/user/current').as('loginAction');
    cy.visit('/login');
    cy.get('input[type=email]').type('admin1@example.com');
    cy.get('input[type=password]').type('Admin!234');
    cy.get('button[type=submit]').click();
    cy.wait('@loginAction');
    cy.visit('/verify');
    cy.get('h1').should('not.contain', '401');
  });
});
