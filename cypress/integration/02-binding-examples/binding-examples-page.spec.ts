import * as _ from 'lodash';
import { getMainPageContentAs } from '../helpers';

// TODO refactor: getMyCounter

describe('Binding Examples page', () => {
  describe('ui', () => {
    it('should render Counter with defaults', () => {
      // TODO: visit page
      cy.visit('/binding-examples');

      // TODO: get main page content
      getMainPageContentAs('pageContent');

      // TODO: find 'My Counter' rendered text
      cy.get('@pageContent')
        .get('nts-my-counter')
        .should('have.length', 1)
        .findByText('My Counter')
        .scrollIntoView()
        .should('be.visible');

      // TODO: find rendered initial counter value
      cy.get('@pageContent')
        .get('nts-my-counter')
        .findByText('10')
        .scrollIntoView()
        .should('be.visible');
    });

    it('should increment counter value on "Increment" button click', () => {
      cy.visit('/binding-examples');
      getMainPageContentAs('pageContent');

      cy.get('@pageContent')
        .get('nts-my-counter')
        .findByText('10')
        .scrollIntoView()
        .then(($el) => {
          const prevValue = parseFloat($el.text());

          cy.get('@pageContent')
            .get('nts-my-counter')
            .findByText('Increment')
            .click();

          cy.get('@pageContent')
            .get('nts-my-counter')
            .findByText(prevValue + 1)
            .should('be.visible');
        });
    });
  });

  describe('navigation', () => {
    xit('should navigate to binding exammples page', () => {
      // TODO
    });
  });
});
