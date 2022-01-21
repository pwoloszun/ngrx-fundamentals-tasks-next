import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';

import { SharedModule } from '@app/shared/shared.module';

import { TestingTasksRoutingModule } from './testing-tasks-routing.module';
import { PureCmpPageComponent } from './pages/01-pure-cmp-page/pure-cmp-page.component';
import { SmartCmpPageComponent } from './pages/02-smart-cmp-page/smart-cmp-page.component';
import { ServicesPageComponent } from './pages/03-services-page/services-page.component';
import { DirectivesPageComponent } from './pages/directives-page/directives-page.component';
import { PipesPageComponent } from './pages/pipes-page/pipes-page.component';
import { ReactiveFormsPageComponent } from './pages/04-reactive-forms-page/reactive-forms-page.component';
import { TestingContextMenuComponent } from './pages/testing-context-menu/testing-context-menu.component';
import { TestingShellComponent } from './pages/testing-shell/testing-shell.component';
import { PureOptionPickerComponent } from './tasks/pure-option-picker/pure-option-picker.component';
import { PureListComponent } from './tasks/pure-list/pure-list.component';
import { PureDataGridComponent } from './tasks/pure-data-grid/pure-data-grid.component';
import { PureMyCardComponent } from './tasks/pure-my-card/pure-my-card.component';
import { SmartQuickSearchComponent } from './tasks/smart-quick-search/smart-quick-search.component';
import { SmartRealEstateDetailsCardComponent } from './tasks/smart-real-estate-details-card/smart-real-estate-details-card.component';
import { SmartHeroesListComponent } from './tasks/smart-heroes-list/smart-heroes-list.component';
import { UserInterestsFormComponent } from './forms/user-interests-form/user-interests-form.component';
import { LoginFormExampleComponent } from './forms/login-form-example/login-form-example.component';
import { FormInfoComponent } from './forms/form-info/form-info.component';

@NgModule({
  declarations: [
    PureCmpPageComponent,
    SmartCmpPageComponent,
    ServicesPageComponent,
    DirectivesPageComponent,
    PipesPageComponent,
    ReactiveFormsPageComponent,
    TestingContextMenuComponent,
    TestingShellComponent,
    PureOptionPickerComponent,
    PureListComponent,
    PureDataGridComponent,
    PureMyCardComponent,
    SmartQuickSearchComponent,
    SmartRealEstateDetailsCardComponent,
    SmartHeroesListComponent,
    UserInterestsFormComponent,
    LoginFormExampleComponent,
    FormInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    SharedModule,
    TestingTasksRoutingModule
  ]
})
export class TestingTasksModule { }
