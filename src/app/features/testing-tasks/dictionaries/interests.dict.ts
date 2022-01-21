import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { getDelay } from '@app/core/api/get-delay';

export interface InterestType {
  id: string;
  name: string;
}

export const interestTypesDict: InterestType[] = [
  { id: 'hobby', name: 'Hobbies & Other' },
  { id: 'sport', name: 'Sport' },
  { id: 'culture', name: 'Culture' }
];

const interestsMap: any = {
  hobby: ['patchwork', 'programming', 'video gaming'],
  sport: ['soccer', 'basketball', 'hockey', 'ski-jumping'],
  culture: ['books', 'films', 'poetry'],
};

export function getInterestsByType$(interestTypeId: string): Observable<string[]> {
  const resultVal = interestsMap[interestTypeId] || [];
  return of(resultVal).pipe(
    delay(getDelay())
  );
}
