import { invoke } from 'lodash';
import { visitSmartComponentsPage } from './helpers';

describe('smart-quick-search.component', () => {

  before(() => {
    visitSmartComponentsPage();
  });

  it('should perform quick search', () => {
    cy.fixture('testing-tasks/02-smart-cmp-page/players.json')
      .as('playersJson')
      .its('length')
      .as('playersJsonEntitiesCount');

    cy.intercept(
      { method: 'GET', path: '/api/players?q=*' },
      { fixture: 'testing-tasks/02-smart-cmp-page/players.json' }
    ).as('findPlayersRequest');

    cy.findByLabelText(/Search/i)
      .as('searchField')
      .should('be.visible');

    cy.get('@searchField')
      .type('Mar');

    cy.findByRole('progressbar')
      .should('be.visible');

    cy.wait('@findPlayersRequest');

    cy.findByRole('progressbar')
      .should('not.exist');

    cy.findByRole('progressbar')
      .should('be.visible');

    cy.get('@playersJsonEntitiesCount')
      .then((playersJsonEntitiesCount) => {

        cy.findByRole('list')
          .scrollIntoView()
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('listitem')
              .its('length')
              .should('equal', playersJsonEntitiesCount);
          });

      });

    cy.get('@playersJson')
      .then((playersJson) => {

        cy.findByRole('list')
          .scrollIntoView()
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('listitem')
              .then(($listItems) => {
                $listItems.each((i, el) => {
                  const playerEntity = playersJson[i] as any;
                  const { first_name, last_name } = playerEntity;
                  const expectedText = `${last_name}, ${first_name}`;
                  expect(el.textContent).to.contain(expectedText);
                });
              });
          });

      });

  });

});
