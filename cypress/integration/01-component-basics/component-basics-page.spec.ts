import { should } from 'chai';
import { getMainNavigationContentAs, getMainPageContentAs } from '../helpers';
describe('Component Basics page', () => {


  it('should find elements within parent', () => {
    cy.visit('/component-basics');

    getMainPageContentAs('mainCont')
      .within(() => {
        cy.findByRole('list', { name: /second/i })
          .should('be.visible')
          .findAllByRole('listitem')
          .should('have.length', 4);
      });
  });


  describe('ui', () => {
    it('should render single hello world', () => {
      cy.visit('/component-basics');

      cy.get('router-outlet')
        .next()
        .as('pageContent');

      cy.get('@pageContent')
        .contains('hello-world'); // TODO: visibility

      cy.get('@pageContent')
        .contains('batman!!');  // TODO: visibility
    });

    xit('should render single personal data', () => {
      // TODO
    });

    it('should render running clock', () => {
      const now = new Date(Date.UTC(1996, 2, 25, 6, 37, 9)).getTime();
      cy.clock(now);

      cy.visit('/component-basics');

      getMainPageContentAs('pageContent');

      cy.get('@pageContent')
        .contains('Current time:')
        .as('currentTime')
        .should('contain', '1996-03-25 07:37:09');

      cy.tick(2 * 3600000 + 4 * 60000 + 3 * 1000);

      cy.get('@currentTime')
        .should('contain', '1996-03-25 09:41:12');
    });
  });

  describe('navigation', () => {
    it('should navigate to component basics page', () => {
      cy.visit('');

      getMainNavigationContentAs('navigationContent');

      cy.get('@navigationContent')
        .contains('E2E Testing')
        .click();
      cy.get('@navigationContent')
        .contains('Comp. Basics')
        .click();

      const expectedUrl = `${Cypress.config('baseUrl')}/component-basics`;
      cy.url()
        .should('contain', expectedUrl);
    });
  });
});
