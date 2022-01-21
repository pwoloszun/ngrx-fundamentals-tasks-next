export function visitCyTasksSubPage(relativePath: string): void {
  cy.visit(`/cy-tasks${relativePath}`);
}
