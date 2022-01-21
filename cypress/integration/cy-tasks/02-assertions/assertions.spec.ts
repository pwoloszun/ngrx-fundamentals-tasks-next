import { getMainNavigationContentAs, getMainPageContentAs, fullAppUrl } from '../../helpers';
import { visitAssertionsPage } from './helpers';

describe('cy tasks: assertions', () => {

  describe('ui', () => {

    // TODO
    // find el containing 'Todos' header AND:
    //    it should contain 4 paragraphs
    //    2nd paragraph should have specific css class
    //    4nd paragraph should have specific css class
    //    3rd paragraph should contain specific text content
    //    1st paragraph should contain specific html

    // TODO
    // find el containing 'item 3', its previous & next siblings should have specific css class

    // TODO
    // find table AND:
    //    table header should have 3 columns
    //    table headers should contain specific texts('Name', 'Secret identity', 'City') in speciffic order
    //    table should render 4 rows of data
    //    even rows should have css background-color: rgb(255, 255, 255) and bold text styles

    // TODO
    // find table AND:
    //    find 2nd cell in 3rd row and check its value
    //    find 1st cell in last row and check it:
    //      has no previous sibling AND
    //      check its next sibling text
    //

    // === form specs ===

    // TODO
    // find form AND for EVERY control(text, password, checkbox, select etc)
    //    find it by label AND check its initial value

    // TODO
    // find form AND for EVERY control(text, password, checkbox, select etc)
    //    find it by label
    //    AND modyfy its value using: type(), check(),unckeck(), select(), unselect()
    //    AND check if it contains that modified value

    // TODO
    // find form AND for EVERY button(Save, Cancel etc.)
    //    find it by text, click it
    //    AND check rendered 'Clicked button' value

  });

  describe('navigation', () => {
    it('should navigate to assertions page', () => {
      visitAssertionsPage();
      getMainNavigationContentAs('mainNav');
      getMainPageContentAs('mainPage');

      cy.get('@mainNav')
        .contains('E2E Testing')
        .click();

      cy.get('@mainNav')
        .contains('Cypress tasks')
        .click();

      cy.get('@mainPage')
        .contains('a', 'Assertions')
        .click();

      cy.url().should('equal', fullAppUrl('/cy-tasks/assertions'));
    });
  });
});
