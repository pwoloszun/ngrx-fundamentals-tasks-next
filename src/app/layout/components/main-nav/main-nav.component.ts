import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { fundamentalsSection } from './route-sections/fundamentals-section';
import { advancedSection } from './route-sections/advanced-section';
import { unitIntegrationTestingSection } from './route-sections/unit-integration-testing-section';
import { e2eTestingSection } from './route-sections/e2e-testing-section';

@Component({
  selector: 'nts-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {

  mainMenuSections = [
    fundamentalsSection,
    advancedSection,
    unitIntegrationTestingSection,
    e2eTestingSection,
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) { }
}
