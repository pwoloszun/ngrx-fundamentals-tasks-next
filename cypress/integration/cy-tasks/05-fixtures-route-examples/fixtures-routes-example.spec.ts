import { throwError } from 'cypress/integration/helpers';

describe('fixtures, routes stubbing examples ', () => {

  it('should stub route with some data', () => {
    cy.intercept({
      method: 'GET',
      pathname: '/api/todos',
    }, [
      { id: 1, title: 'buy cat!' }
    ],
    ).as('getTodosRequest');

    cy.visit('/advanced-todos');
    cy.wait('@getTodosRequest')
      .then((intercepted) => {
        if (!intercepted.response) {
          throwError(`Undefined response`);
        }
        const actualTodos = intercepted.response.body;
        expect(actualTodos).to.have.length(1);
        expect(actualTodos[0].id).to.equal(1);
      });

  });

  it('should stub route using fixtures', () => {
    const todosJsonFixturePath = '44-adv-todos/todos.json';
    cy.fixture(todosJsonFixturePath)
      .as('todosJSON');

    cy.intercept({
      method: 'GET',
      pathname: '/api/todos',
    }, {
      fixture: todosJsonFixturePath,
    }).as('getTodosRequest');

    cy.visit('/advanced-todos');

    cy.wait('@getTodosRequest')
      .then((intercepted) => {
        cy.get('@todosJSON')
          .then((todosJson) => {
            if (!intercepted.response) {
              throwError('Undefined response');
            }
            expect(intercepted.response.body).to.deep.equals(todosJson);
          });
      });

  });
});
