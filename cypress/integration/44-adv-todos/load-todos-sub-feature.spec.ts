import { Todo } from '@api/models/todos.models';

import { stubFetchTodosAs, findTodoListItemsAs } from './helpers';

describe('Adv. Todos page: load todos sub-feature', () => {

  it('should render todo title for every fetched todo', () => {
    stubFetchTodosAs('getTodosRequest', 'todosJSON');

    cy.visit('/advanced-todos');
    cy.wait('@getTodosRequest');

    findTodoListItemsAs('todoListItems');

    cy.get<Todo[]>('@todosJSON')
      .then((todos) => {
        todos.forEach((todo, i) => {
          const { title, description = '' } = todo;
          cy.get('@todoListItems')
            .eq(i)
            .scrollIntoView()
            .within(() => {
              cy.findByText(title)
                .should('be.visible');
              if (description.trim().length > 0) {
                cy.findByText(description)
                  .should('be.visible');
              }
            });
        });
      });
  });

  it('should render progress bar before Todos are loaded, and hide it afterwards', () => {
    stubFetchTodosAs('getTodosRequest', 'todosJSON');

    cy.visit('/advanced-todos');
    cy.findByRole('progressbar', { name: /Load todos progressbar/i })
      .should('be.visible');

    cy.wait('@getTodosRequest');
    cy.findByRole('progressbar', { name: /Load todos progressbar/i })
      .should('not.exist');
  });

});
