import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@shared/shared.module';

import { CyTasksRoutingModule } from './cy-tasks-routing.module';
import { TestingSubMenuComponent } from './components/testing-sub-menu/testing-sub-menu.component';

import { QueryingComponent } from './pages/01-querying/querying.component';
import { AssertionsComponent } from './pages/02-assertions/assertions.component';
import { TestingShellComponent } from './pages/testing-shell/testing-shell.component';
import { WaitUntilComponent } from './pages/06-wait-until/wait-until.component';
import { TraversalTasksComponent } from './pages/traversal-tasks/traversal-tasks.component';
import { AdvQueryingTasksComponent } from './pages/04-adv-querying-tasks/adv-querying-tasks.component';
import { HelloCyComponent } from './components/hello-cy/hello-cy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InfiniteScrollModule,
    SharedModule,
    // local
    CyTasksRoutingModule
  ],
  declarations: [
    QueryingComponent,
    AssertionsComponent,
    TestingSubMenuComponent,
    TestingShellComponent,
    WaitUntilComponent,
    TraversalTasksComponent,
    AdvQueryingTasksComponent,
    HelloCyComponent,
  ],
})
export class CyTasksModule { }
