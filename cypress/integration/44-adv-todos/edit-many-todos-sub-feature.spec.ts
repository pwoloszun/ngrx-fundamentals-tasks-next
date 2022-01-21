import * as faker from 'faker';
import { Todo } from '@api/models/todos.models';

import { stubFetchTodosAs, findTodoListItemsAs } from './helpers';

describe('Adv. Todos page: edit many Todos sub-feature', () => {

  it('should be possible to edit and then cancel those changes instead of saving them', () => {
    stubFetchTodosAs('getTodosRequest', 'todosJSON');

    cy.visit('/advanced-todos');
    cy.wait('@getTodosRequest');

    findTodoListItemsAs('todoListItems');

    cy.get<Todo[]>('@todosJSON')
      .then((todos) => {
        const index = 3;
        const todoDuringEdition = todos[index];

        cy.get('@todoListItems')
          .eq(index)
          .as('editedTodoItem')
          .should('contain', todoDuringEdition.title)
          .findByText('Edit')
          .click();

        cy.get('@editedTodoItem')
          .scrollIntoView()
          .within(() => {
            cy.findByLabelText('Edit title')
              .type(faker.lorem.words(3));
            cy.findByLabelText('Edit description')
              .type(faker.lorem.words(5));
            cy.contains('button', 'Cancel')
              .click();

            cy.findByLabelText('Edit title')
              .should('not.exist');
            cy.findByLabelText('Edit description')
              .should('not.exist');
            cy.contains('button', 'Save')
              .should('not.exist');
            cy.findByRole('button', { name: 'Cancel' })
              .should('not.exist');

            cy.findByText(todoDuringEdition.title)
              .should('be.visible');
            if (todoDuringEdition.description) {
              cy.findByText(todoDuringEdition.description)
                .should('be.visible');
            }
            cy.findByRole('button', { name: 'Edit' })
              .should('be.visible');
            cy.findByRole('button', { name: 'Remove' })
              .should('be.visible');
          });
      });
  });

  it('should be able to edit many Todos simultaneously', () => {
    stubFetchTodosAs('getTodosRequest', 'todosJSON');

    cy.visit('/advanced-todos');
    cy.wait('@getTodosRequest');

    findTodoListItemsAs('todoListItems');

    cy.get<Todo[]>('@todosJSON')
      .then((todos) => {
        const indices = [1, 2, 5];

        indices.forEach((index) => {
          const todoDuringEdition = todos[index];
          cy.get('@todoListItems')
            .eq(index)
            .should('contain', todoDuringEdition.title)
            .findByText('Edit')
            .click();
        });

        indices.forEach((index) => {
          const todoDuringEdition = todos[index];
          cy.get('@todoListItems')
            .eq(index)
            .scrollIntoView()
            .within(() => {
              cy.findByRole('button', { name: 'Save' })
                .should('be.visible');
              cy.findByRole('button', { name: 'Cancel' })
                .should('be.visible');
              cy.findByLabelText('Edit title')
                .should('be.visible')
                .and('have.value', todoDuringEdition.title);
              cy.findByLabelText('Edit description')
                .should('be.visible')
                .and('have.value', todoDuringEdition.description);
            });
        });
      });
  });

});
