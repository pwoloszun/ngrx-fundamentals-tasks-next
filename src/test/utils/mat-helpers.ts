import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

export async function matSelectOption(selectCtrl: HTMLElement, optionText: string | RegExp) {
  userEvent.click(selectCtrl);
  const optionEl = await screen.findByText(optionText);
  userEvent.click(optionEl);
}

export function matGetByPlaceholderText(placeholderText: string): HTMLElement {
  const elements = document.querySelectorAll(`[data-placeholder="${placeholderText}"]`);
  if (elements.length < 1) {
    throw new Error(`No matching placeholder='${placeholderText}'`);
  } else if (elements.length > 1) {
    throw new Error(`To many (${elements.length}) elements matching placeholder='${placeholderText}'`);
  } else {
    return elements[0] as HTMLElement;
  }
}
