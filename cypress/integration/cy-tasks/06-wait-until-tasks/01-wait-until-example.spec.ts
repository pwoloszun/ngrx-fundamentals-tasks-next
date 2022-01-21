import { throwError } from 'cypress/integration/helpers';
import { visitWaitUntilPage } from './helpers';

describe('wait-until-example', () => {
  it('should wait for square to resize', () => {
    visitWaitUntilPage();

    cy.findByTestId('square')
      .as('square');

    cy.get('@square')
      .then(($el) => {
        const prevHeight = $el.height() as number;
        return cy.get('@square').waitUntil(($elSquare) => {
          if (!$elSquare) {
            throwError(`Undef el`);
          }
          const currentHeight = $elSquare.height() as number;
          return currentHeight > prevHeight;
        });
      });

    cy.get('@square')
      .should('contain', 'imba');
  });
});
