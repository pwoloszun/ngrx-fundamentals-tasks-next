import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { State, actions, selectors } from '../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nts-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.css']
})
export class MailDetailsComponent implements OnInit, OnDestroy {

  nextMessageId$ = this.store.pipe(
    select(selectors.selectNextMessageId)
  );
  prevMessageId$ = this.store.pipe(
    select(selectors.selectPrevMessageId)
  );

  isNextDisabled$ = this.store.pipe(
    select(selectors.hasNextMessage),
    map((hasNext) => !hasNext)
  );
  isPrevDisabled$ = this.store.pipe(
    select(selectors.hasPrevMessage),
    map((hasPrev) => !hasPrev)
  );

  message$ = this.store.pipe(
    select(selectors.selectCurrentMessageEntity)
  );

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit() {
    const sub = this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      const action = actions.showMessageDetailsRequest(id);
      this.store.dispatch(action);
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
