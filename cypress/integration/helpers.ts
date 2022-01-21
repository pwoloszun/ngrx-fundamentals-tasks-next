export function fullAppUrl(path: string) {
  return `${Cypress.config('baseUrl')}${path}`;
}

// TODO getMainPageContentAs
export function getMainNavigationContentAs(alias: string) {
  return cy.get(`[role='navigation']`)
    .as(alias);
}

// TODO getMainPageContentAs
export function getMainPageContentAs(alias: string) {
  return cy.get(`[role='main']`)
    .as(alias);
}

export function throwError(message: string): never {
  throw new Error(message);
}
