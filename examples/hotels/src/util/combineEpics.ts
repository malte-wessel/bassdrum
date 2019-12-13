import { Action, Epic } from './createStore';
import { merge } from 'rxjs';

export const combineEpics = <S, A extends Action>(...epics: Epic<S, A>[]) => (
    ...args: Parameters<Epic<S, A>>
) => merge(...epics.map(epic => epic(...args)));
