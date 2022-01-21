import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainNavComponent } from './components/main-nav/main-nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [MainNavComponent, PageNotFoundComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class LayoutModule {}
