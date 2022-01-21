/// <reference types="./dashboard.commands" />

Cypress.Commands.add('visitDashboard', () => {
  cy.visit('').as('getDashboardPage');
});
