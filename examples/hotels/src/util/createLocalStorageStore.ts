import {
    createStore,
    Action,
    ActionCreators,
    Reducer,
    Epic,
} from './createStore';
import { combineEpics } from './combineEpics';
import { distinctUntilChanged, tap, ignoreElements } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

export const createLocalStorageStore = <
    S,
    A extends Action,
    T extends ActionCreators<A>
>(
    key: string,
    actionCreators: T,
    reducer: Reducer<S, A>,
    initialState: S,
    epic?: Epic<S, A>,
) => {
    const read = () => {
        try {
            const record = localStorage.getItem(key);
            if (!record) return initialState;
            return JSON.parse(record) as S;
        } catch (e) {
            return initialState;
        }
    };

    const write = (data: S) => {
        try {
            const record = JSON.stringify(data);
            localStorage.setItem(key, record);
        } catch (error) {
            return;
        }
    };
    const persist: Epic<S, A> = (_: Subject<A>, state: BehaviorSubject<S>) =>
        state.pipe(distinctUntilChanged(), tap(write), ignoreElements());

    const epics: Epic<S, A>[] = [persist];

    if (epic) {
        epics.push(epic);
    }

    const store = createStore(
        actionCreators,
        reducer,
        { ...initialState, ...read() },
        combineEpics(...epics),
    );
    return store;
};
