import { filter } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { Action } from './createStore';

const keyHasType = (type: unknown, key: unknown) =>
    type === key || (typeof key === 'function' && type === key.toString());

export const ofType = <
    I extends Action,
    T extends I['type'],
    O extends I = Extract<I, Action<T>>
>(
    ...types: [T, ...T[]]
): OperatorFunction<I, O> =>
    filter((action): action is O => {
        const { type } = action;
        const len = types.length;

        if (len === 1) {
            return keyHasType(type, types[0]);
        } else {
            for (let i = 0; i < len; i++) {
                if (keyHasType(type, types[i])) {
                    return true;
                }
            }
        }

        return false;
    });
