import { merge } from 'lodash';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { createEventEmitterSpy } from 'src/test/utils/create-spy';
import { SharedModule } from '@app/shared/shared.module';

import { PureDataGridComponent } from './pure-data-grid.component';

describe('PureDataGridComponent', () => {

  it('should render grid headers', async () => {
    const props = generateProps();
    const { metaData } = props;
    await renderPureDataGrid(props);

    const headerCells = getAllHeaderCells();

    expect(headerCells.length).toEqual(metaData?.length);
    metaData?.forEach((meta, i) => {
      const { text } = meta;
      const header = headerCells[i];
      expect(header.textContent).toContain(text);
    });
  });

  it('should render grid rows', async () => {
    const props = generateProps();
    const { items, metaData } = props;
    await renderPureDataGrid(props);

    const rows = getAllGridRows();

    expect(rows.length).toEqual(items?.length);
    items?.forEach((item, i) => {
      const expectedValues = metaData?.map((meta) => '' + item[meta.value]);
      const row = rows[i];
      const cells = getAllCellsWithin(row);
      const actualValues = cells.map((cell) => cell.textContent?.trim());
      expect(actualValues).toEqual(expectedValues);
    });
  });

  it('should not select any row if selectedItem prop undefined', async () => {
    const props = generateProps();
    const { items, metaData } = props;

    await renderPureDataGrid(props);

    const selectedRow = querySelectedGridRow();
    expect(selectedRow).toEqual(null);
  });

  it('should select row related to selectedItem prop', async () => {
    const index = 1;
    const props = generateProps({}, index);
    const { items, metaData, selectedItem } = props;

    await renderPureDataGrid(props);

    const rows = getAllGridRows();
    const selectedRow = querySelectedGridRow();
    expect(rows[index]).toEqual(selectedRow);
  });

  it('should emit "itemClick" event on data row click', async () => {
    const index = 1;
    const props = generateProps({}, index);
    const { items, itemClick } = props;

    await renderPureDataGrid(props);
    const row = getGridRowBy(index);
    userEvent.click(row);

    expect(itemClick?.emit).toBeCalled();
    const expectedItem = items ? items[index] : null;
    expect(itemClick?.emit).toBeCalledWith(expectedItem);
  });
});

type Props = Partial<PureDataGridComponent<any>>;

async function renderPureDataGrid(componentProperties: Props) {
  return render(PureDataGridComponent, {
    componentProperties,
    imports: [SharedModule],
  });
}

function generateProps(props: Props = {}, selectedItemIndex?: number): Props {
  const items = [
    { id: 100, secretIdentity: 'Peter Parker', name: 'Spider-Man' },
    { id: 200, secretIdentity: 'Bruce', name: 'Batman' },
    { id: 300, secretIdentity: 'Clark', name: 'Superman' },
  ];
  const selectedItem = selectedItemIndex ? items[selectedItemIndex] : null;
  const metaData = [
    { text: 'Hero Name', value: 'name' },
    { text: 'Hero ID', value: 'id' },
  ];
  const itemClick = createEventEmitterSpy();
  const defaultInputs = { items, selectedItem, metaData, itemClick };
  return merge({}, defaultInputs, props);
}

function getAllGridRows() {
  const itemsRowGroup = getDataRowsGroup();
  return within(itemsRowGroup).getAllByRole('row', { hidden: true });
}

function getGridRowBy(index: number) {
  const rows = getAllGridRows();
  return rows[index];
}

function getAllHeaderCells() {
  const rowsGroups = screen.getAllByRole('rowgroup', { hidden: true });
  const headerRowGroup = rowsGroups[0];
  return within(headerRowGroup).getAllByRole('columnheader', { hidden: true });
}

function getAllCellsWithin(row: HTMLElement) {
  return within(row).getAllByRole('cell', { hidden: true });
}

function querySelectedGridRow() {
  const itemsRowGroup = getDataRowsGroup();
  return within(itemsRowGroup).queryByRole('row', { hidden: true, selected: true });
}

function getDataRowsGroup() {
  const rowsGroups = screen.getAllByRole('rowgroup', { hidden: true });
  return rowsGroups[1];
}
