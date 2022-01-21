declare namespace Cypress {
  interface Chainable<Subject> {
    visitQueryingPage(): Chainable<any>;
  }
}
