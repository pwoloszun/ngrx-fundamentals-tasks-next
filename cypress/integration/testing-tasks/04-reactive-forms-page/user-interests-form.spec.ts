import { selectMatOption, visitTestingTasksReactiveForms } from './helpers';

describe('user-interests-form.component', () => {

  before(() => {
    visitTestingTasksReactiveForms();
  });

  it('should select mat select option', () => {
    selectMatOption(/Select Your Country/i, /USA/i);

    cy.findByLabelText(/Select Your Country/i)
      .should('have.text', 'USA');
  });

});
