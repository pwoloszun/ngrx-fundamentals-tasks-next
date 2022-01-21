import { merge } from 'lodash';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { createEventEmitterSpy } from 'src/test/utils/create-spy';
import { SharedModule } from '@app/shared/shared.module';

import { PureOptionPickerComponent } from './pure-option-picker.component';

describe('PureOptionPickerComponent', () => {

  it('should render input title', async () => {
    const props = generateComponentProps();
    const { title } = props;
    await renderPureOptionPicker(props);

    expect(screen.getByText(/My Test Title/i));
  });

  it('should render button for each input item', async () => {
    const props = generateComponentProps();
    const { items } = props;
    await renderPureOptionPicker(props);

    const buttons = screen.getAllByRole('button', { hidden: true });

    expect(buttons.length).toEqual(items?.length);

    items?.forEach((item, i) => {
      const expectedText = item.text;
      const actualText = buttons[i].textContent;
      expect(actualText).toContain(expectedText);
    });
  });

  it('should not select button for undefined selectedItem prop', async () => {
    const props = generateComponentProps();
    await renderPureOptionPicker(props);

    const pressedBtn = queryPressededButton();

    expect(pressedBtn).toEqual(null);
  });

  it('should select button for defined selectedItem prop', async () => {
    const index = 2;
    const props = generateComponentProps({}, index);

    await renderPureOptionPicker(props);

    const pressedBtn = queryPressededButton();
    const expectedBtn = getButtonByIndex(index);
    expect(pressedBtn).toEqual(expectedBtn);
  });

  it('should emit "itemSelect" event on button click', async () => {
    const props = generateComponentProps();
    const { itemSelect, items = [] } = props;

    await renderPureOptionPicker(props);
    const index = 2;
    const btn = getButtonByIndex(index);
    userEvent.click(btn);

    expect(itemSelect?.emit).toHaveBeenCalled();
    const expecedItem = items[index];
    expect(itemSelect?.emit).toHaveBeenCalledWith(expecedItem);
  });

});

type Props = Partial<PureOptionPickerComponent<any>>;

async function renderPureOptionPicker(componentProperties: Props) {
  return render(PureOptionPickerComponent, {
    componentProperties,
    imports: [
      SharedModule
    ]
  });
}

function generateComponentProps(props: Props = {}, selectedItemIndex?: number): Props {
  const title = 'My Test Title';
  const items = [
    { id: 100, text: 'first item' },
    { id: 200, text: 'second item' },
    { id: 300, text: 'third item' },
    { id: 400, text: 'fourth item' },
    { id: 500, text: 'fifth item' },
  ];

  const selectedItem = selectedItemIndex ? items[selectedItemIndex] : undefined;

  const itemSelect = createEventEmitterSpy();

  const defaultInputs = { title, items, itemSelect, selectedItem };
  return merge({}, defaultInputs, props);
}

function getAllButtons() {
  return screen.getAllByRole('button', { hidden: true });
}

function getButtonByIndex(index: number) {
  const buttons = getAllButtons();
  if (index > buttons.length - 1 || index < 0) {
    throw new Error(`Not enough buttons(${buttons.length}): ${index}`);
  }
  return buttons[index];
}

function queryPressededButton() {
  return screen.queryByRole('button', { hidden: true, pressed: true });
}
