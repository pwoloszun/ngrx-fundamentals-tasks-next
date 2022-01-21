import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs/operators';

import { countriesDict } from '../../dictionaries/countries.dict';
import { getInterestsByType$, interestTypesDict } from '../../dictionaries/interests.dict';
import { InterestFormApiService, InterestFormDtoParams } from '../../services/interest-form-api.service';

@Component({
  selector: 'nts-user-interests-form',
  templateUrl: './user-interests-form.component.html',
  styleUrls: ['./user-interests-form.component.css']
})
export class UserInterestsFormComponent implements OnInit {

  allCountries = countriesDict;
  allInterestTypes = interestTypesDict;

  selectedInterestsMap: any = {};
  availableInterestLabels: string[] = [];
  isInterestsLoding = false;

  myForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    age: [null, [Validators.required, Validators.min(7)]],

    areDetailsEnabled: [false],
    height: [null],

    country: [null, Validators.required],

    selectedInterestType: [null],
    availableInterests: this.formBuilder.array([]),
  });

  get areDetailsEnabledControl(): FormControl {
    return this.myForm.get('areDetailsEnabled') as FormControl;
  }

  get selectedInterestTypeControl(): FormControl {
    return this.myForm.get('selectedInterestType') as FormControl;
  }

  get availableInterestsControls(): AbstractControl[] {
    return (this.myForm.get('availableInterests') as FormArray).controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private interestFormApiService: InterestFormApiService
  ) { }

  submitHandler(event: any) {
    event.preventDefault();
    const { value } = this.myForm;
    const dto = toFormDto(value, this.selectedInterestsMap);
    // console.log('UserInterestsFormComponent DTO', dto);
    this.interestFormApiService.create(dto)
      .subscribe((createdEntity) => {
        console.log('createdEntity:', createdEntity);
      });
  }

  ngOnInit(): void {
    this.areDetailsEnabledControl.valueChanges.subscribe((areDetailsEnabled) => {
      if (!areDetailsEnabled) {
        this.myForm.get('height')?.setValue(null);
      }
    });

    this.selectedInterestTypeControl.valueChanges
      .pipe(
        tap(() => this.isInterestsLoding = true),
        switchMap((interestType) => {
          return getInterestsByType$(interestType);
        }),
        tap(() => this.isInterestsLoding = false)
      )
      .subscribe((interests: string[]) => {
        this.buildAvailableInterests(interests);
      });


    this.myForm.valueChanges
      .pipe(
        map((formValue) => formValue.availableInterests),
      )
      .subscribe((selected: boolean[]) => {
        this.availableInterestLabels.forEach((interest, i) => {
          this.selectedInterestsMap[interest] = selected[i];
        });
      });
  }

  private buildAvailableInterests(interests: string[]) {
    this.availableInterestLabels = interests;
    const selectedValues = interests.map((interest) => {
      const isSelected = !!this.selectedInterestsMap[interest];
      return this.formBuilder.control(isSelected);
    });
    this.myForm.setControl('availableInterests', this.formBuilder.array(selectedValues));
  }

}

function toFormDto(formValue: any, selectedInterestsMap: any): InterestFormDtoParams {
  return {
    fullName: formValue.fullName,
    age: formValue.age,
    areDetailsEnabled: formValue.areDetailsEnabled,
    height: formValue.height,
    country: formValue.country,
    selectedInterestsMap: { ...selectedInterestsMap },
  };
}
