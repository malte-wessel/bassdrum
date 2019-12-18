import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { bindActions } from './bindActions';
import { Dictionary } from '../types/util';

export interface Action<T = string> {
    type: T;
}

export type ActionCreator<A extends Action> = (...args: any) => A;

export type ActionCreators<A extends Action> = Dictionary<ActionCreator<A>>;

export type Reducer<S, A> = (state: S, action: A) => S;

export type Epic<S, A> = (
    action: Subject<A>,
    state: BehaviorSubject<S>,
) => Observable<any>;

export const createStore = <S, A extends Action, T extends ActionCreators<A>>(
    actionCreators: T,
    reducer: Reducer<S, A>,
    initialState: S,
    epic?: Epic<S, A>,
) => {
    const actions = new Subject<A>();
    const state = new BehaviorSubject(initialState);

    actions.subscribe(action => state.next(reducer(state.value, action)));

    if (epic) {
        epic(actions, state).subscribe((action: A) => actions.next(action));
    }

    const boundActions = bindActions(actionCreators, actions);
    return Object.assign({ state }, boundActions);
};
