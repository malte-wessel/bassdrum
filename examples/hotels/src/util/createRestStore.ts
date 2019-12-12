import { Subject, merge, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { createStore } from './createStore';
import { ofType } from './ofType';

export interface RestApi<P, R> {
    get: (params: P) => Promise<R>;
}

export interface RestStoreData<R> {
    isLoading: boolean;
    error: Error | null;
    data: R | null;
}

export interface RestStoreLoadAction<P> {
    type: 'LOAD';
    payload: P;
}

export interface RestStoreStartAction {
    type: 'START';
}

export interface RestStoreSuccessAction<R> {
    type: 'SUCCESS';
    payload: R;
}

export interface RestStoreErrorAction {
    type: 'ERROR';
    payload: Error;
}

export type RestStoreActions<P, R> =
    | RestStoreLoadAction<P>
    | RestStoreStartAction
    | RestStoreSuccessAction<R>
    | RestStoreErrorAction;

export const createRestStore = <P, R>(api: RestApi<P, R>) => {
    const loadAction = (params: P): RestStoreLoadAction<P> => ({
        type: 'LOAD',
        payload: params,
    });

    const startAction = (): RestStoreStartAction => ({ type: 'START' });

    const successAction = (data: R): RestStoreSuccessAction<R> => ({
        type: 'SUCCESS',
        payload: data,
    });

    const errorAction = (error: Error): RestStoreErrorAction => ({
        type: 'ERROR',
        payload: error,
    });

    const initialState = (): RestStoreData<R> => ({
        isLoading: false,
        error: null,
        data: null,
    });

    const reducer = (
        state: RestStoreData<R>,
        action: RestStoreActions<P, R>,
    ): RestStoreData<R> => {
        switch (action.type) {
            case 'START': {
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
    const actionCreators = {
        load: loadAction,
    };

    const epic = (actions: Subject<RestStoreActions<P, R>>) =>
        actions.pipe(
            ofType('LOAD'),
            switchMap(action =>
                merge(
                    of(startAction()),
                    from(api.get(action.payload)).pipe(
                        map(successAction),
                        catchError(err => of(errorAction(err))),
                    ),
                ),
            ),
        );
    return createStore(actionCreators, reducer, initialState(), epic);
};
