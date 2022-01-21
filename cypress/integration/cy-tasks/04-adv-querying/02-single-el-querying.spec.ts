import { fullAppUrl, getMainNavigationContentAs } from 'cypress/integration/helpers';
import { visitAdvQueryingPage } from './helpers';

describe('single el querying', () => {
  describe('app navigation', () => {
    it('should be possible to navigate to Querying page using app nav', () => {
      cy.visit('/');

      getMainNavigationContentAs('navigationCont');

      cy.get('@navigationCont')
        .contains('E2E Testing')
        .click();
      cy.get('@navigationCont')
        .contains('Cypress tasks')
        .click();

      cy.url().should('equal', fullAppUrl('/cy-tasks/querying'));
    });

    it('should redirect to querying page by default', () => {
      cy.visit('/cy-tasks');
      cy.url()
        .should('include', '/cy-tasks/querying');
    });
  });

  it('should find greeting header', () => {
    visitAdvQueryingPage();

    cy.get('h5') // BAD practice selector
      .should('contain', 'hello');

    cy.get('h5')
      .invoke('text')
      .should('match', /^hello/);

    cy.get('h5')
      .should(($h5) => {
        const textContent = $h5.text();
        expect(textContent).to.match(/^hello/);
      });
  });

  it('should find greeting header', () => {
    visitAdvQueryingPage();

    cy.findByTestId('greeting') // GOOD practice selector
      .should('contain', 'hello');
  });
});
