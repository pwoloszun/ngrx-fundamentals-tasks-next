import { fullAppUrl, getMainNavigationContentAs, getMainPageContentAs } from 'cypress/integration/helpers';

describe('reactive-forms-page.component', () => {

  it('should manually navigate to reactive forms page', () => {
    cy.visit('/');

    getMainNavigationContentAs('mainNav');
    getMainPageContentAs('mainContent');

    cy.get('@mainNav')
      .within(() => {
        cy.findByText(/Unit, Integration Testing/i)
          .click();
        cy.findByText(/Testing tasks/i)
          .click();
      });

    cy.get('@mainContent')
      .within(() => {
        cy.findByText(/Reactive Forms/i)
          .click();
        cy.findByText(/reactive-forms-page/i)
          .should('be.visible');
      });

    const expectedUrl = fullAppUrl('/testing-tasks/reactive-forms');
    cy.url()
      .should('equal', expectedUrl);
  });

});
