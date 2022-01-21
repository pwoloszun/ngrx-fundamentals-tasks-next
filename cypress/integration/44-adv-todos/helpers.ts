import { forEach } from 'lodash';

import { getMainPageContentAs } from '../helpers';

const todosFixturePath = '44-adv-todos/todos.json';

export function stubFetchTodosAs(routeAlias: string, jsonAlias: string): void {
  cy.fixture(todosFixturePath)
    .as(jsonAlias);
  cy.intercept({
    method: 'GET',
    pathname: '/api/todos',
  }, {
    fixture: todosFixturePath,
  }).as(routeAlias);
}

export function findTodoListItemsAs(alias: string) {
  return getMainPageContentAs('pageContent')
    .findByRole('list', { name: /Todo list/i })
    .findAllByRole('listitem', { name: /Todo item/i })
    .as(alias);
}

export function findTodoFormAs(alias: string) {
  return getMainPageContentAs('pageContent')
    .findAllByRole('region', { name: /Todo form/i })
    .as(alias);
}

interface FieldValuesDict {
  [label: string]: string;
}

export function fillFormWithAndSubmit(alias: string, fieldValues: FieldValuesDict): void {
  cy.get(alias)
    .within(() => {
      forEach(fieldValues, (fieldValue, label) => {
        cy.findByLabelText(label)
          .type(fieldValue);
      });
      cy.findByText('Submit')
        .click();
    });
}

export function findModalInfoAs(alias: string) {
  return cy.get('snack-bar-container')
    .as(alias);
}
