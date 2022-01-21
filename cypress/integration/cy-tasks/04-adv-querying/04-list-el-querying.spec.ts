import { visitAdvQueryingPage } from './helpers';

describe('list el querying', () => {
  it('should wait for list to load async', () => {
    visitAdvQueryingPage();

    cy.findByTestId('async-people-cont')
      .find('li', { timeout: 2500 })
      .should('have.length', 7);
  });

  it('should async render todos, one by one', () => {
    visitAdvQueryingPage();

    cy.findByTestId('async-todos-cont')
      .as('todosCont');

    cy.get('@todosCont')
      .find('li', { timeout: 2500 })
      .should('have.length.gte', 2);

    cy.get('@todosCont')
      .find('li', { timeout: 2000 })
      .should('have.length.gte', 4);
  });


  it('should check testing-library query commands', () => {
    visitAdvQueryingPage();

    cy.findByPlaceholderText('Your age?')
      .should('have.value', 5);

    cy.findAllByPlaceholderText(/your/i)
      .should('have.length', 2);

    cy.findByTestId('my-label-cont')
      .within(() => {
        cy.findByLabelText('Imba!')
          .should('have.value', 'qq@qq.qq');

        cy.findAllByLabelText(/imb/i)
          .should('have.attr', 'type', 'email');
      });
  });
});
