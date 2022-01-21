import { merge } from 'lodash';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { matGetByPlaceholderText, matSelectOption } from 'src/test/utils/mat-helpers';
import { stubServerApi } from 'src/test/utils/server-stub';
import { SharedModule } from '@app/shared/shared.module';

import { InterestFormApiService, InterestFormDtoParams } from '../../services/interest-form-api.service';
import { UserInterestsFormComponent } from './user-interests-form.component';

describe('UserInterestsFormComponent', () => {

  it('should render form containing controls', async () => {
    await renderComponent();

    const form = screen.getByRole('form', { hidden: true });
    within(form).getByText(/User Interests form/i);

    const nameCtrl = within(form).getByLabelText(/Full Name/i);
    expect(nameCtrl).toHaveValue('');

    const ageCtrl = within(form).getByLabelText(/Your Age/i);
    expect(ageCtrl).toHaveValue(null);

    const enableDetailsCtrl = within(form).getByLabelText(/Enable details/i);
    expect(enableDetailsCtrl).not.toBeChecked();

    expect(within(form).queryByLabelText(/Your Height/i)).not.toBeInTheDocument();

    const selectCountryCtrl = within(form).getByLabelText(/Select Your Country/i);
    expect(selectCountryCtrl).toHaveTextContent('');

    const inerestTypeCtrl = within(form).getByLabelText(/Select your Interest Type/i);
    expect(inerestTypeCtrl).toHaveTextContent('');

    within(form).getByRole('button', { name: /Submit/i, hidden: true });
  });

  it('should toggle render Details group', async () => {
    await renderComponent();
    const form = screen.getByRole('form', { hidden: true });
    const enableDetailsCtrl = within(form).getByLabelText(/Enable details/i);

    userEvent.click(enableDetailsCtrl);

    const group = within(form).getByRole('group', { hidden: true });
    expect(within(group).getByLabelText(/Your Height/i));

    userEvent.click(enableDetailsCtrl);
    expect(within(form).queryByLabelText(/Your Height/i)).not.toBeInTheDocument();
  });

  it('should send request with form DTO to server when form submitted', async () => {
    const expectedDto = generateDto({ areDetailsEnabled: true });
    await renderComponent();
    const form = screen.getByRole('form', { hidden: true });

    const nameCtrl = within(form).getByLabelText(/Full Name/i);
    userEvent.type(nameCtrl, expectedDto.fullName);

    const ageCtrl = within(form).getByLabelText(/Your Age/i);
    userEvent.type(ageCtrl, '' + expectedDto.age);

    const enableDetailsCtrl = within(form).getByLabelText(/Enable details/i);
    userEvent.click(enableDetailsCtrl);

    const heightCtrl = within(form).getByLabelText(/Your Height/i);
    userEvent.type(heightCtrl, '' + expectedDto.height);

    const selectCountryCtrl = within(form).getByLabelText(/Select Your Country/i);
    await matSelectOption(selectCountryCtrl, /Poland/i);

    const inerestTypeCtrl = within(form).getByLabelText(/Select your Interest Type/i);
    await matSelectOption(inerestTypeCtrl, /Sport/i);

    await within(form).findByRole('progressbar', { hidden: true });

    const bballCtrl = await screen.findByLabelText(/basketball/i);
    userEvent.click(bballCtrl);

    const soccerCtrl = screen.getByLabelText(/soccer/i);
    userEvent.click(soccerCtrl);

    stubServerApi.stub({
      method: 'post',
      path: '/api/interest-forms',
      responseJson: expectedDto,
      options: { delay: 100 }
    });
    const submitBtn = within(form).getByRole('button', { name: /Submit/i, hidden: true });
    userEvent.click(submitBtn);
  });

  it('should beable to fid field by placeholder text', async () => {
    await renderComponent();

    const myFullNameByPlaceholder = matGetByPlaceholderText('Your name?');
    expect(myFullNameByPlaceholder).toHaveValue('');

    const fullNameByLabel = screen.getByLabelText(/Full Name/i);
    userEvent.type(fullNameByLabel, 'fox in the forest');

    const fullNameByPlaceholder = screen.getByPlaceholderText(/Your name\?/i);
    expect(fullNameByPlaceholder).toHaveValue('fox in the forest');

    expect(fullNameByPlaceholder).toEqual(fullNameByLabel);
    expect(myFullNameByPlaceholder).toEqual(fullNameByLabel);
  });

});

async function renderComponent() {
  return render(UserInterestsFormComponent, {
    imports: [SharedModule, ReactiveFormsModule, HttpClientModule],
    providers: [InterestFormApiService],
  });
}

function generateDto(params: Partial<InterestFormDtoParams> = {}): InterestFormDtoParams {
  const defaultDto = {
    fullName: 'Bob Smith',
    age: 55,
    areDetailsEnabled: true,
    height: 179,
    country: 'PL',
    selectedInterestsMap: {
      backetball: true,
      soccer: true,
      hockey: false,
      'ski-jumping': false,
    },
  };
  return merge({}, defaultDto, params);
}
