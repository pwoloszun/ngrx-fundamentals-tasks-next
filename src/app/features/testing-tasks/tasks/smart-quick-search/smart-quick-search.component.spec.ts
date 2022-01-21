import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { stubServerApi } from 'src/test/utils/server-stub';
import { SharedModule } from '@shared/shared.module';
import { NbaPlayersApiService, NbaPlayer } from '@api/nba/nba-players-api.service';

import { PureListComponent } from '../pure-list/pure-list.component';
import { SmartQuickSearchComponent } from './smart-quick-search.component';
import { waitForElToNotBeInDoc } from 'src/test/utils/helpers';

describe('SmartQuickSearchComponent', () => {

  it('should render search field', async () => {
    await renderComponent();

    expect(getSearchField());
  });

  it('should render progress while waiting for response from server', async () => {
    const jsonEntities = generateEntitiesJson();
    stubServerApi.stub({
      method: 'get',
      path: '/api/players',
      responseJson: jsonEntities,
      options: { delay: 100 }
    });

    await renderComponent();
    const searchField = getSearchField();
    userEvent.type(searchField, `my search query`);

    const progressBar = await screen.findByRole('progressbar', { hidden: true });
    await waitForElToNotBeInDoc(progressBar);

    screen.getByText(/Search Results/i);
    const list = screen.getByRole('list', { hidden: true });
    const items = within(list).getAllByRole('listitem', { hidden: true });
    expect(items.length).toEqual(jsonEntities.length);

    jsonEntities.forEach((entity, i) => {
      const { first_name, last_name, position } = entity;
      const item = items[i];
      const expectedText = `${last_name}, ${first_name} (${position})`;
      expect(item).toHaveTextContent(expectedText);
    });
  });

});

function getSearchField() {
  return screen.getByLabelText(/Search/i);
}

async function renderComponent() {
  return render(SmartQuickSearchComponent, {
    imports: [SharedModule, HttpClientModule, ReactiveFormsModule],
    declarations: [PureListComponent],
    providers: [NbaPlayersApiService]
  });
}

function generateEntitiesJson(): NbaPlayer[] {
  return [
    {
      "id": 14,
      "first_name": "Ike",
      "height_feet": null,
      "height_inches": null,
      "last_name": "Anigbogu",
      "position": "C",
      "weight_pounds": null,
      "team_id": 12
    },
    {
      "id": 25,
      "first_name": "Ron",
      "height_feet": null,
      "height_inches": null,
      "last_name": "Baker",
      "position": "G",
      "weight_pounds": null,
      "team_id": 20
    },
    {
      "id": 67,
      "first_name": "MarShon",
      "height_feet": null,
      "height_inches": null,
      "last_name": "Brooks",
      "position": "G",
      "weight_pounds": null,
      "team_id": 15
    },
    {
      "id": 71,
      "first_name": "Lorenzo",
      "height_feet": null,
      "height_inches": null,
      "last_name": "Brown",
      "position": "G",
      "weight_pounds": null,
      "team_id": 28
    },
  ];
}
