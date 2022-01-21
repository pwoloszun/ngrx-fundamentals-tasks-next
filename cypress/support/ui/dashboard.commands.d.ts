declare namespace Cypress {
  interface Chainable<Subject> {
    visitDashboard(): Chainable<any>;
  }
}
