import { visitAdvQueryingPage } from './helpers';

describe('infinite list', () => {
  it('should load 30 feeds on inti', () => {
    visitAdvQueryingPage();

    cy.findByTestId('async-infinite-feeds-cont')
      .as('infiniteFeedsCont');

    cy.get('@infiniteFeedsCont')
      .find('li', { timeout: 2000 })
      .should('have.length', 30);
  });

  it('should load 10 more feeds on every scroll down', () => {
    visitAdvQueryingPage();

    cy.findByTestId('feeds-inifinite-scroll-cont')
      .as('scrollableCont');

    cy.get('@scrollableCont')
      .scrollTo('bottom');

    cy.get('@scrollableCont')
      .find('li', { timeout: 2000 })
      .should('have.length', 40);

    cy.get('@scrollableCont')
      .scrollTo('bottom');

    cy.get('@scrollableCont')
      .find('li', { timeout: 2500 })
      .should('have.length', 50);
  });

  it('should show spiner while loading and hide afterwards', () => {
    visitAdvQueryingPage();

    cy.findByTestId('feeds-inifinite-scroll-cont')
      .as('scrollableCont');
    cy.get('@scrollableCont')
      .findByTestId('loading-feeds-spinner')
      .as('loadingSpinner');

    cy.get('@loadingSpinner')
      .scrollIntoView()
      .should('be.visible');
    cy.get('@scrollableCont')
      .find('li', { timeout: 2000 })
      .should('have.length', 30);
    cy.get('@loadingSpinner')
      .should('not.exist');

    cy.get('@scrollableCont')
      .scrollTo('bottom');

    cy.get('@loadingSpinner')
      .scrollIntoView()
      .should('be.visible');
    cy.get('@scrollableCont')
      .find('li', { timeout: 2000 })
      .should('have.length', 40);
    cy.get('@loadingSpinner')
      .should('not.exist');
  });
});
