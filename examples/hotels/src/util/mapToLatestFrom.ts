import { Observable, pipe } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

export const mapToLatestFrom = <T>(observable: Observable<T>) =>
    pipe(
        withLatestFrom(observable),
        map(([, value]) => value),
    );
