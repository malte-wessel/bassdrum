import { h, render, Ref } from 'preact';
import { first, last, tap, delay, filter } from 'rxjs/operators';
import {
    createComponent,
    ComponentFunction,
    ComponentTemplate,
} from '../src/component';
import { combine } from '../src/util/combine';
import { createRef } from '../src/util/createRef';
import { createHandler } from '../src/util/createHandler';
import { Handler, MouseEvent } from '../src/types/events';

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
        expect(root).toMatchSnapshot();
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

    it('supports handlers', done => {
        interface Props {}
        interface State {
            handleClick: Handler<MouseEvent<HTMLDivElement>>;
        }

        const cfn: ComponentFunction<Props, State> = ({ subscribe }) => {
            const [handleClick, event] = createHandler<
                MouseEvent<HTMLDivElement>
            >();
            subscribe(
                event.pipe(
                    tap(event => {
                        expect(event).toBeInstanceOf(MouseEvent);
                        done();
                    }),
                ),
            );
            return combine({ handleClick });
        };
        const ct: ComponentTemplate<State> = state => (
            <div id="target" onClick={state.handleClick}></div>
        );
        const Component = createComponent(cfn, ct);

        const root = document.createElement('div');
        document.body.appendChild(root);
        render(<Component />, root);

        const target = document.getElementById('target');
        target?.click();
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
                    filter(Boolean),
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
    it('supports lifecylce methods', () => {
        interface Props {
            foo: string;
        }

        interface State {
            foo: string;
        }

        const mountedEvents: Props[] = [];
        const updateEvents: Props[] = [];
        const unmountedEvents: Props[] = [];

        const cfn: ComponentFunction<Props, State> = ({
            props,
            updates,
            subscribe,
        }) => {
            const mounted = updates.pipe(first());
            const unmount = updates.pipe(last());
            subscribe(mounted.pipe(tap(p => mountedEvents.push(p))));
            subscribe(updates.pipe(tap(p => updateEvents.push(p))));
            subscribe(unmount.pipe(tap(p => unmountedEvents.push(p))));
            return props;
        };
        const ct: ComponentTemplate<State> = state => <div>{state.foo}</div>;
        const Component = createComponent(cfn, ct);

        const root = document.createElement('div');
        render(<Component foo="bar" />, root);
        expect({
            mountedEvents,
            updateEvents,
            unmountedEvents,
        }).toMatchSnapshot();
        render(<Component foo="nom" />, root);
        expect({
            mountedEvents,
            updateEvents,
            unmountedEvents,
        }).toMatchSnapshot();
        render(() => null, root);
        expect({
            mountedEvents,
            updateEvents,
            unmountedEvents,
        }).toMatchSnapshot();
    });
});
