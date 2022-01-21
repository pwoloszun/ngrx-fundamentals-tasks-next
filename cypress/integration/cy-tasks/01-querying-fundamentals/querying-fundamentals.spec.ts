import { visitQueryingPage } from './helpers';

describe('cy tasks: querying fundamentals', () => {
  before(() => {
    visitQueryingPage();
  });

  it('should find greeting by text', () => {


    cy.contains('hello world');
    // TODO: get by id
    // TODO: access using then
  });

  // TODO chaining
  xit('should find other greeting within card', () => {
    // TODO get by data-testid
  });

  it('should find all first names on page', () => {
    cy.findAllByTestId('first-name')
      .should('have.length', 3);
  });

  it('should find some first names within', () => {
    cy.findByTestId('person-panel')
      .findAllByTestId('first-name')
      .should('have.length', 1);
  });

  it('should find person called batman', () => {
    cy.findByTestId('async-people-cont')
      .contains('batman');
  });

  it('should find all batman sigblings', () => {
    cy.findByTestId('async-people-cont')
      .contains('batman')
      .siblings()
      .then(($siblings) => {
        cy.log('batman siblings', $siblings);
      });
  });

  it('should find ed next and prev sibling', () => {
    cy.findByTestId('async-people-cont')
      .contains('ed')
      .then(($el) => {
        const prevSibling = $el.prev();
        const nextSibling = $el.next();
        expect(prevSibling).to.contain('bob');
        expect(nextSibling).to.contain('kate');
      });
  });

  it('should render ed as 3rd person', () => {
    cy.findByTestId('async-people-cont')
      .find('li')
      .eq(2)
      .should('contain', 'ed');
  });

  it('should render batman as 1st person', () => {
    cy.findByTestId('async-people-cont')
      .find('li:eq(0)')
      .should('contain', 'batman')
      .and('not.contain', 'bob');
  });

  it('should render batman as 1st person, using nth-child() selector', () => {
    cy.findByTestId('async-people-cont')
      .find('li:nth-child(1)')
      .should('contain', 'batman')
      .and('not.contain', 'bob');
  });

  it('should render 2 people with a name starting with letter "b"', () => {
    cy.findByTestId('async-people-cont')
      .find('li')
      .should('have.length', 7)
      .then(($elements) => {
        return $elements.filter((i, el: any) => {
          const text = el.textContent.trim();
          return text[0] === 'b';
        });
      })
      .should('have.length', 5);
  });

  it('should render title and people within people cont & load more people afterwards', () => {
    visitQueryingPage();

    cy.findByTestId('async-people-cont')
      .within(() => {
        cy.contains('People');
        cy.get('li')
          .should('have.length', 4);
      })
      .find('li')
      .should('have.length', 7);
  });


});
