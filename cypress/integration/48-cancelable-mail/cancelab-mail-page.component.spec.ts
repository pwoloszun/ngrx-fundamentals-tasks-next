describe('cancelab-mail-page.component', () => {

  it('should successfully send cancelable and reversible mail', () => {
    visitCancelableMailPage();
    startSendingMail();

    withinSnackbar(() => {
      cy.findByText(/Sending/i);
      cy.findByRole('button', { name: /Cancel/i });
    });

    waitUntilSnackbarContains(/Mail has been sent/i);

    withinSnackbar(() => {
      cy.findByText(/Mail has been sent/i)
        .should('be.visible');
      cy.findByRole('button', { name: /Revert/i })
        .should('be.visible');
    });

    waitUntilSnackbarContains(/Mail successfully sent/i);

    withinSnackbar(() => {
      cy.findByText(/Mail successfully sent/i)
        .should('be.visible');
    });

    findSnackbar()
      .should('not.exist');
  });

  it('should cancel sending mail', () => {
    visitCancelableMailPage();
    startSendingMail();

    withinSnackbar(() => {
      cy.findByText(/Sending/i)
        .should('be.visible');
      cy.findByRole('button', { name: /Cancel/i })
        .click();
    });

    waitUntilSnackbarContains(/Canceling/i);

    findSnackbar()
      .should('not.exist');
  });

  it('should revert sending mail', () => {
    visitCancelableMailPage();
    startSendingMail();

    withinSnackbar(() => {
      cy.findByText(/Sending/i)
        .should('be.visible');
      cy.findByRole('button', { name: /Cancel/i })
        .should('be.visible');
    });

    waitUntilSnackbarContains(/Mail has been sent/i);

    withinSnackbar(() => {
      cy.findByText(/Mail has been sent/i)
        .should('be.visible');
      cy.findByRole('button', { name: /Revert/i })
        .click();
    });

    waitUntilSnackbarContains(/Reverting changes/i);

    findSnackbar()
      .should('not.exist');
  });

});

type WithinSnackCb = ($snackbar: JQuery) => void;

function withinSnackbar(cb: WithinSnackCb) {
  findSnackbar()
    .should('have.length', 1)
    .within(cb);
}

function findSnackbar() {
  return cy.get('snack-bar-container', { timeout: 4500 });
}

function waitUntilSnackbarContains(re: RegExp) {
  cy.waitUntil(() => {
    return cy.get('snack-bar-container')
      .should('have.length', 1)
      .invoke('text')
      .then((textContent) => {
        return textContent.match(re) !== null;
      });
  }, { interval: 300 });
}

function startSendingMail() {
  cy.findByRole('button', { name: /Create Mail/i })
    .click();

  cy.findByRole('dialog')
    .should('be.visible')
    .within(() => {
      cy.findByRole('button', { name: /Send/i })
        .click();
    });
}

function visitCancelableMailPage() {
  cy.visit(`/cancelable-mail`);
}
