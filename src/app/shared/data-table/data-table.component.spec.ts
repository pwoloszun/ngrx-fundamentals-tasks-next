import { merge } from 'lodash';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  describe('@Inputs', () => {
    it('should render row for each item', async () => {
      const { metaData, items, selectedItem } = generateDataTableInputs();

      await render(DataTableComponent, {
        componentProperties: {
          metaData,
          selectedItem,
          items,
        },
      });
      const itemRows = getAllItemRows();
      expect(itemRows.length).toEqual(items.length);
    });

    it('should sort cells in metaData order', async () => {
      const { metaData, items, selectedItem } = generateDataTableInputs();

      await render(DataTableComponent, {
        componentProperties: {
          metaData,
          selectedItem,
          items,
        },
      });

      const itemRows = getAllItemRows();
      const actualTexts = itemRows.map((row) => {
        const cells = getAllCellsWithinRow(row)
        return cells.map((cell) => cell.textContent?.trim()).join(' ');
      });
      const expectedTexts = items.map((item: any) => {
        const sortedValues = metaData.map(({ value }) => item[value]);
        return sortedValues.join(' ');
      });

      expect(actualTexts).toEqual(expectedTexts);
    });

    it('should highlight selected item', async () => {
      const { metaData, items } = generateDataTableInputs();
      const index = 1;
      const selectedItem = items[index];

      await render(DataTableComponent, {
        componentProperties: {
          metaData,
          selectedItem,
          items,
        },
      });

      const selectedRow = querySelectedRow();

      expect(selectedRow).not.toBeNull();
      expect(selectedRow?.className).toMatch(/highlighted/);
    });

    it('should highlight nothing if selectedItem undefined', async () => {
      const { metaData, items } = generateDataTableInputs();
      const selectedItem = null;

      await render(DataTableComponent, {
        componentProperties: {
          metaData,
          selectedItem,
          items,
        },
      });

      const itemRows = getAllItemRows();
      const rowCssClasses = itemRows.map((row) => row.className).join(' ');

      expect(rowCssClasses).not.toMatch(/highlighted/);
    });
  });

  describe('@Outputs()', () => {
    it('should emit item linked with clicked row', async () => {
      const { metaData, items, selectedItem } = generateDataTableInputs();
      const index = 1;

      const itemClick = { emit: () => { } };
      jest.spyOn(itemClick, 'emit');

      await render(DataTableComponent, {
        componentProperties: {
          itemClick: itemClick as any,
          metaData,
          selectedItem,
          items,
        },
      });

      const selectedRow = getAllItemRows()[index];
      userEvent.click(selectedRow);

      expect(itemClick.emit).toHaveBeenCalledTimes(1);
      expect(itemClick.emit).toHaveBeenCalledWith(items[index]);
    });
  });
});

function generateDataTableInputs(inputs = {}) {
  const items = [
    { id: 100, name: 'bob', age: 12 },
    { id: 200, name: 'ed', age: 34 },
    { id: 300, name: 'kate', age: 97 },
  ];
  const metaData = [
    { value: 'age', text: 'User Age' },
    { value: 'name', text: 'Full Name' },
  ];
  const selectedItem = null;
  const defaultInputs = { items, metaData, selectedItem };
  return merge({}, defaultInputs, inputs);
}

function getAllItemRows() {
  const rowgroups = screen.getAllByRole('rowgroup', { hidden: true });
  const tbody = rowgroups[1];
  return within(tbody).getAllByRole('row', { hidden: true });
}

function getAllCellsWithinRow(row: HTMLElement) {
  return within(row).getAllByRole('cell', { hidden: true });
}

function getAllHeaders() {
  const rowgroups = screen.getAllByRole('rowgroup', { hidden: true });
  const thead = rowgroups[0];
  return within(thead).getAllByRole('columnheader', { hidden: true });
}

function querySelectedRow() {
  return screen.getByRole('row', { hidden: true, selected: true });
}
