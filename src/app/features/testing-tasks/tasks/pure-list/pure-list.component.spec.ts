import { SharedModule } from '@app/shared/shared.module';
import { render, screen } from '@testing-library/angular';
import { merge } from 'lodash';

import { PureListComponent } from './pure-list.component';

describe('PureListComponent', () => {

  it('should render list item for each input item', async () => {
    const props = generateProps();
    const { items } = props;

    await renderPureList(props);

    const listItems = getAllListItems();

    expect(listItems.length).toEqual(items?.length);

    items?.forEach((item, i) => {
      const { name, secretIdentity } = item;
      const renderedText = listItems[i].textContent;
      expect(renderedText).toContain(name);
      expect(renderedText).toContain(secretIdentity);
    });
  });
});

const template = `
<nts-pure-list [items]="items">
  <ng-template let-hero
               let-i="index">
    <h3 matLine>Hero: {{hero.name}}</h3>
    <p matLine>
      <small>{{i + 1}} Price: {{hero.secretIdentity}}</small>
    </p>
  </ng-template>
</nts-pure-list>
`;

type Props = Partial<PureListComponent<any>>;

async function renderPureList(componentProperties: Props) {
  return render(PureListComponent, {
    componentProperties,
    template,
    imports: [SharedModule],
  });
}

function generateProps(props: Props = {}): Props {
  const items = [
    { id: 100, secretIdentity: 'Peter Parker', name: 'Spider-Man' },
    { id: 200, secretIdentity: 'Bruce', name: 'Batman' },
    { id: 300, secretIdentity: 'Clark', name: 'Superman' },
  ];
  const defaultInputs = { items };
  return merge({}, defaultInputs, props);
}

function getAllListItems() {
  return screen.getAllByRole('listitem', { hidden: true });
}
