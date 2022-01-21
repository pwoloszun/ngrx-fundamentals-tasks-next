import { Todo } from '@api/models/todos.models';

import { stubFetchTodosAs, findTodoListItemsAs } from './helpers';

describe('Adv. Todos page: remove todo sub-feature', () => {

  it('should indicate todo is removing, and then remove it from list', () => {
    stubFetchTodosAs('getTodosRequest', 'todosJSON');
    cy.intercept({
      method: 'DELETE',
      pathname: '/api/todos/*',
    }, {
      body: -999, // GOTCHA p1
    }).as('removeTodoRequest');

    cy.visit('/advanced-todos');
    cy.wait('@getTodosRequest');

    findTodoListItemsAs('todoListItems');

    cy.get<Todo[]>('@todosJSON')
      .then((todos) => {
        const index = 2;
        const todoToRemove = todos[index];
        cy.wrap(todoToRemove)
          .as('todoToRemove');

        cy.get('@todoListItems')
          .eq(index)
          .as('toRemoveListItem')
          .should('contain', todoToRemove.title)
          .findByText('Remove')
          .click();

        cy.get('@toRemoveListItem')
          .should('contain', 'Removing...');

        cy.get('@toRemoveListItem')
          .findByRole('button', { name: 'Remove' })
          .should('be.disabled');
        cy.get('@toRemoveListItem')
          .findByRole('button', { name: 'Edit' })
          .should('be.disabled');
      });

    cy.wait('@removeTodoRequest')
      .then(({ request, response }) => {
        // GOTCHA p2
        const idStr = (request as any).url.match(/\/api\/todos\/(\d+)/)[1];
        const removedTodoId = parseFloat(idStr);
        (response as any).body = removedTodoId;
      });

    cy.get('@todosJSON')
      .then((todos) => {
        cy.get('@todoListItems')
          .should('have.length', todos.length - 1);
      });

    cy.get<Todo>('@todoToRemove')
      .then((todoToRemove) => {
        cy.get('@todoListItems')
          .should('not.contain', todoToRemove.title);
      });
  });

});
