import { BehaviorSubject, Observable, merge, of, from } from 'rxjs';
import {
    switchMap,
    map,
    distinctUntilChanged,
    catchError,
} from 'rxjs/operators';
import { shallowEqual } from './shallowEqual';

export interface RestApi<P, R> {
    get: (params: P) => Promise<R>;
}

export interface RestStoreData<R> {
    isLoading: boolean;
    error: Error | null;
    data: R | null;
}

interface RestStoreLoadAction {
    type: 'LOAD';
}

const loadAction = (): RestStoreLoadAction => ({ type: 'LOAD' });

interface RestStoreSuccessAction<R> {
    type: 'SUCCESS';
    payload: R;
}

const successAction = <R>(data: R): RestStoreSuccessAction<R> => ({
    type: 'SUCCESS',
    payload: data,
});

interface RestStoreErrorAction {
    type: 'ERROR';
    payload: Error;
}

const errorAction = (error: Error): RestStoreErrorAction => ({
    type: 'ERROR',
    payload: error,
});

type RestStoreActions<R> =
    | RestStoreLoadAction
    | RestStoreSuccessAction<R>
    | RestStoreErrorAction;

const initialState = <R>(): RestStoreData<R> => ({
    isLoading: false,
    error: null,
    data: null,
});

const reducer = <R>(
    state: RestStoreData<R>,
    action: RestStoreActions<R>,
): RestStoreData<R> => {
    switch (action.type) {
        case 'LOAD': {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        }
        case 'SUCCESS': {
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        }
        case 'ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export const createRestStore = <P, R>(api: RestApi<P, R>) => {
    const subject = new BehaviorSubject<RestStoreData<R>>(initialState());
    return (params: Observable<P>) => {
        params
            .pipe(
                distinctUntilChanged(shallowEqual),
                switchMap(params =>
                    merge(
                        of(loadAction()),
                        from(api.get(params)).pipe(
                            map(successAction),
                            catchError(err => of(errorAction(err))),
                        ),
                    ),
                ),
            )
            .subscribe(action => subject.next(reducer(subject.value, action)));
        return subject;
    };
};
