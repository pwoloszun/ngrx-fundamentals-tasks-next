import { HttpClientModule } from '@angular/common/http';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { stubServerApi } from 'src/test/utils/server-stub';
import { SharedModule } from '@shared/shared.module';
import { HeroesService } from '@api/hero.service';
import { Hero } from '@api/models/hero.model';

import { SmartHeroesListComponent } from './smart-heroes-list.component';
import { PureListComponent } from '../pure-list/pure-list.component';

describe('SmartHeroesListComponent', () => {

  it('should render progress, async load entities from server, and render list', async () => {
    const jsonEntities = generateEntitiesJson();
    stubServerApi.stub({
      method: 'get',
      path: '/api/heroes',
      responseJson: jsonEntities
    });

    await renderComponent();

    expect(screen.getAllByRole('progressbar', { hidden: true }));
    await screen.findByRole('list', { hidden: true });
  });

  it('should render listitem for each entity fetched from server', async () => {
    const jsonEntities = generateEntitiesJson();
    stubServerApi.stub({
      method: 'get',
      path: '/api/heroes',
      responseJson: jsonEntities
    });

    await renderComponent();
    const list = await screen.findByRole('list', { hidden: true });
    const items = within(list).getAllByRole('listitem', { hidden: true });

    expect(items.length).toEqual(jsonEntities.length);
    jsonEntities.forEach((entity, i) => {
      const { name, secretIdentity } = entity;
      const item = items[i];
      expect(item).toHaveTextContent(name);
      expect(item).toHaveTextContent(secretIdentity);
    });
  });

});

async function renderComponent() {
  return render(SmartHeroesListComponent, {
    imports: [SharedModule, HttpClientModule],
    declarations: [PureListComponent],
    providers: [HeroesService]
  });
}

function generateEntitiesJson(): Hero[] {
  return [
    { "id": 1, "name": "Batman", "secretIdentity": "Bruce Wayne", "universe": "DC" },
    { "id": 2, "name": "Superman", "secretIdentity": "Clark Kent", "universe": "DC" },
    { "id": 3, "name": "Super Bob", "secretIdentity": "Bob Smith", "universe": "rl" },
    { "id": 4, "name": "Magnificent Ed", "secretIdentity": "Ed Bo", "universe": "rl" }
  ];
}
