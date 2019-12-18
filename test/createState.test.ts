import { createState } from '../src/util/createState';
import { Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
describe('createState', () => {
    it('should reduce actions to state', () => {
        type Action = 'inc' | 'dec';
        const actions = new Subject<Action>();

        const reducer = (state: number, action: Action) => {
            switch (action) {
                case 'inc': {
                    return state + 1;
                }
                case 'dec': {
                    return state - 1;
                }
                default: {
                    return state;
                }
            }
        };

        const initalState = 0;

        const state = createState(reducer, initalState, actions);

        state
            .pipe(toArray())
            .subscribe(result => expect(result).toMatchSnapshot());

        actions.next('inc');
        actions.next('inc');
        actions.next('dec');
        actions.complete();
    });
});
