import { visitAdvQueryingPage } from './helpers';

describe('nested el querying', () => {
  it('should find el within container', () => {
    visitAdvQueryingPage();

    cy.findByTestId('person-panel').within(() => {
      cy.contains('Name');
      cy.findByTestId('full-name')
        .should('contain', 'Bob');
    });
  });
});
