/// <reference types="./01-querying.commands" />

Cypress.Commands.add('visitQueryingPage', () => {
  cy.visit('/testing-tasks/querying');
});
