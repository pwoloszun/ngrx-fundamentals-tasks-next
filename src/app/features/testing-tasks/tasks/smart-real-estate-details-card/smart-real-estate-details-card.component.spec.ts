import { merge } from 'lodash';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveComponentModule } from '@ngrx/component';
import { render, screen, within } from '@testing-library/angular';

import { waitForElToNotBeInDoc } from 'src/test/utils/helpers';
import { stubServerApi } from 'src/test/utils/server-stub';
import { SharedModule } from '@app/shared/shared.module';
import { RealEstate } from '@api/models/real-estate.model';
import { RealEstatesApiService } from '@api/real-estates-api.service';

import { PureMyCardComponent } from '../pure-my-card/pure-my-card.component';
import { SmartRealEstateDetailsCardComponent } from './smart-real-estate-details-card.component';

describe('SmartRealEstateDetailsCardComponent', () => {

  it('should render fetched real estates data', async () => {
    const props = generateProps();
    const entityId = props.entityId as number;
    const entityJson = generateEntityJson(entityId);
    stubServerApi.stub({
      method: 'get',
      path: `/api/real-estates/${entityId}`,
      responseJson: entityJson,
    });

    await renderComponent(props);

    screen.getByRole('progressbar', { hidden: true });

    await screen.findByText(`Street Addr.: ${entityJson.street}`);
    await screen.findByText(`Price: ${entityJson.price}`);
    await screen.findByText(`Type: ${entityJson.type}`);
  });

  it('should STRICTLY render loding info and fetched real estates data', async () => {
    const entityId = 100;
    const realEstateJson = generateEntityJson(entityId);
    stubServerApi.stub({
      method: 'get',
      path: `/api/real-estates/${entityId}`,
      responseJson: realEstateJson,
      options: { delay: 200 }
    });
    await renderComponent({ entityId });

    // rendered within header
    const headingEl = await findHeading();
    within(headingEl).getByText(/Loading\.\.\./i);

    const contentEl = await findContent();
    const progressBaarEl = within(contentEl).getByRole('progressbar', { hidden: true });

    // wait untill progressbar disapears
    await waitForElToNotBeInDoc(progressBaarEl);

    const loadedHeadingEl = await findHeading();
    within(loadedHeadingEl).getByText(new RegExp(`Street Addr.: ${realEstateJson.street}`, 'i'));

    const loadedContentEl = await findContent();
    within(loadedContentEl).getByText(new RegExp(`Type: ${realEstateJson.type}`, 'i'));

    const loadedFooterEl = await findFooter();
    within(loadedFooterEl).getByText(/All Rights reserved/i);
  });

  xit('should render loading info while waiting for async data', async () => {
    expect(true).toEqual(false);
  });

  xit('should render error message is error received from server', async () => {
    expect(true).toEqual(false);
  });

});

type Props = Partial<SmartRealEstateDetailsCardComponent>;

async function renderComponent(componentProperties: Props) {
  return render(SmartRealEstateDetailsCardComponent, {
    componentProperties,
    imports: [SharedModule, ReactiveComponentModule, HttpClientModule],
    declarations: [PureMyCardComponent],
    providers: [RealEstatesApiService]
  });
}

function generateProps(props: Props = {}): Props {
  const entityId = 10;
  const defaultProps = { entityId };
  return merge({}, defaultProps, props);
}

function generateEntityJson(id: number): RealEstate {
  return {
    id,
    "builtAt": "Sun Mar 12 2007 16:11:54 GMT+0100 (CET)",
    "lat": 53.997123,
    "lng": 20.230891,
    "price": 997.997,
    "street": "Sezam St.",
    "type": "COM"
  };
}

async function findHeading() {
  return screen.findByRole('heading', {
    name: 'Real Estate Heading',
    hidden: true
  });
}

async function findContent() {
  return screen.findByRole('region', {
    name: 'Real Estate Content', hidden: true
  });
}

async function findFooter() {
  return screen.findByRole('contentinfo', {
    name: 'Real Estate Footer',
    hidden: true
  });
}
