describe('Dashboard page', () => {

  it('should render root url', () => {
    cy.visitDashboard();
    const expectedUrl = Cypress.config('baseUrl');
    cy.url().should('equal', `${expectedUrl}/`);
  });

  it('should render Dashboard', () => {
    cy.visitDashboard();
    cy.contains('dashboard');
  });
});
