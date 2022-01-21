import { visitWaitUntilPage } from './helpers';

describe('race condition', () => {
  it('should pick date', () => {
    visitWaitUntilPage();

    const obj = { foo: 'bar' };
    setTimeout(() => { obj.foo = 'baz'; }, 1000);

    cy.wrap(obj)
      .pipe(function getFoo(s) {
        return s.foo;
      })
      .should('equal', 'baz');
  });
});
