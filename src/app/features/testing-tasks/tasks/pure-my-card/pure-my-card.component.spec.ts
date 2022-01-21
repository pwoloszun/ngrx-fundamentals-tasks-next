import { render, screen } from '@testing-library/angular';

import { SharedModule } from '@app/shared/shared.module';

import { PureMyCardComponent } from './pure-my-card.component';

describe('PureMyCardComponent', () => {

  it('should render all slots', async () => {
    await renderComponent();

    expect(screen.getByText(/big header/i));
    expect(screen.getByText(/content test/i));
    expect(screen.getByText(/my footer/i));
  });

});

const template = `
<nts-pure-my-card>
  <div slot="header">
    <h3>big header</h3>
  </div>

  <div slot="footer">my footer</div>

  <div slot="content">
    <p>content test</p>
  </div>
</nts-pure-my-card>
`;

async function renderComponent() {
  return render(PureMyCardComponent, {
    template,
    imports: [SharedModule],
  });
}
