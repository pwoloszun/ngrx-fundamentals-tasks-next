import { getMainPageContentAs } from '../helpers';

export function getCarConfiguratorAs(alias: string) {
  return getMainPageContentAs('pageContent')
    .findByTestId('car-config')
    .as(alias);
}

export function getOptionPickerByText(labelText: string, carConfigAlias: string) {
  return cy.get(carConfigAlias)
    .find('nts-option-picker')
    .filter((index, el) => {
      const re = new RegExp(labelText);
      return Boolean(el.innerText.match(re));
    });
}
