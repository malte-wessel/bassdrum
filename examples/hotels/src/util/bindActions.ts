import { Subject } from 'rxjs';
import { Dictionary, ReplaceReturnType } from '../types/util';
import { Action, ActionCreator } from './createStore';

export type BoundActions<T> = {
    [K in keyof T]: ReplaceReturnType<T[K], void>;
};

export const bindAction = <T extends ActionCreator<A>, A extends Action>(
    actionCreator: T,
    actions: Subject<A>,
): ReplaceReturnType<T, void> => (...args: any) => {
    actions.next(actionCreator(...args));
};

export const bindActions = <
    A extends Action,
    T extends Dictionary<ActionCreator<A>>
>(
    actionCreators: T,
    actions: Subject<A>,
): BoundActions<T> => {
    const boundActions = {} as BoundActions<T>;
    for (const key in actionCreators) {
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            boundActions[key] = bindAction(actionCreator, actions);
        }
    }
    return boundActions;
};
