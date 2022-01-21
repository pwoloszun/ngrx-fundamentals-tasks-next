import { getCarConfiguratorAs, getOptionPickerByText } from './helpers';

describe('Inputs, Outputs examples page', () => {
  describe('ui', () => {
    before(() => {
      cy.visit('/inputs-outputs-examples');
    });

    it('should render Car Configurator with initial values', () => {
      getCarConfiguratorAs('carConfigurator');

      cy.get('@carConfigurator')
        .should('contain', 'CarConfigurator')
        .and('contain', 'Current config');

      ['Engine:', 'Color:', 'Type of Drive:'].forEach((labelText) => {
        const regExp = new RegExp(`${labelText}\\s+$`);
        cy.get('@carConfigurator')
          .contains(labelText)
          .invoke('text')
          .should('match', regExp);
      });

    });

    it('should render option pickers for: engine, color and type of drive', () => {
      getCarConfiguratorAs('carConfigurator');

      cy.get('@carConfigurator')
        .find('nts-option-picker')
        .as('allOptionPickers')
        .should('have.length', 3);

      const testCases = [
        { label: 'Choose engine type', options: ['Petrol', 'Diesel', 'Tesla'] },
        { label: 'Select color', options: ['Black', 'White', 'Red', 'Yellow'] },
        { label: 'Your type of drive?', options: ['4X', 'Front-Wheel-Drive', 'Rear-Wheel-Drive'] },
      ];

      testCases.forEach(({ label, options }, index) => {
        cy.get('@allOptionPickers')
          .eq(index)
          .should('contain', label)
          .find('button')
          .then(($buttons) => {
            const actualBtnTexts = [];
            $buttons.each((_, btn) => {
              const text = btn.innerText.trim();
              actualBtnTexts.push(text);
            });
            expect(actualBtnTexts).to.deep.equal(options);
          });
      });
    });

    it('should show selected Engine option', () => {
      getCarConfiguratorAs('carConfigurator');

      cy.get('@carConfigurator')
        .findByText('Engine:')
        .as('selectedEngine');

      getOptionPickerByText('Choose engine type', '@carConfigurator')
        .as('enginePicker');

      cy.get('@enginePicker')
        .findByText('Diesel')
        .click();

      cy.get('@selectedEngine')
        .should('contain', 'Diesel');

      cy.get('@enginePicker')
        .findByText('Petrol')
        .click();

      cy.get('@selectedEngine')
        .should('contain', 'Petrol');
    });

  });

  describe('navigation', () => {
    xit('should be possible enter page via menu', () => {
      // TODO
    });
  });
});
