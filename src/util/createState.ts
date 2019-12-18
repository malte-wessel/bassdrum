import { Observable } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

export type Reducer<S, A> = (state: S, actions: A) => S;

export const createState = <S, A>(
    reducer: Reducer<S, A>,
    initialState: S,
    actions: Observable<A>,
) => actions.pipe(scan(reducer, initialState), startWith(initialState));
