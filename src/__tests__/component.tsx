import { h, render, Ref } from 'preact';
import { tap, delay } from 'rxjs/operators';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
} from '../component';
import { combine } from '../util/combine';
import { createRef } from '../util/createRef';

describe('Component', () => {
    it('renders a component', () => {
        interface Props {
            foo: string;
        }

        interface State {
            foo: string;
        }

        const cfn: ComponentFunction<Props, State> = ({ props }) => props;
        const ct: ComponentTemplate<State> = state => <div>{state.foo}</div>;
        const Component = createComponent(cfn, ct);

        const root = document.createElement('div');
        render(<Component foo="bar" />, root);
    });

    it('throws when component function does not emit', () => {
        interface Props {}
        interface State {
            foo: string;
        }
        const cfn: ComponentFunction<Props, State> = () =>
            combine({ foo: 'bar' }).pipe(delay(300));

        const ct: ComponentTemplate<State> = state => <div>{state.foo}</div>;
        const Component = createComponent(cfn, ct);

        const root = document.createElement('div');
        expect(() => {
            render(<Component />, root);
        }).toThrow();
    });

    it('supports refs', done => {
        interface Props {}
        interface State {
            ref: Ref<HTMLDivElement>;
        }

        const cfn: ComponentFunction<Props, State> = ({ subscribe }) => {
            const [ref, elementStream] = createRef<HTMLDivElement>();
            subscribe(
                elementStream.pipe(
                    tap(el => {
                        expect(el).toBeInstanceOf(HTMLDivElement);
                        done();
                    }),
                ),
            );
            return combine({ ref });
        };
        const ct: ComponentTemplate<State> = state => (
            <div ref={state.ref}></div>
        );
        const Component = createComponent(cfn, ct);

        const root = document.createElement('div');
        render(<Component />, root);
    });
});
