import { Component, ComponentChild, Fragment, h } from 'preact';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { shallowEqual } from './util/shallowEqual';

class BasedrumComponent<P, S> extends Component<P, S> {
    propsStream: BehaviorSubject<P>;
    updates: Subject<P>;
    subscriptions: Subscription[];

    constructor(props: P, context: any) {
        super(props, context);
        this.propsStream = new BehaviorSubject(props);
        this.updates = new Subject();
        this.subscriptions = [];
        this.subscriptions.push(this.createSubscription());
    }

    createSubscription(): Subscription {
        return new Subscription();
    }

    componentWillMount() {}

    componentWillReceiveProps(props: P) {
        this.propsStream.next(props);
    }

    shouldComponentUpdate(_: P, nextState: S) {
        return this.state !== nextState;
    }

    componentDidUpdate() {
        this.updates.next(this.props);
    }

    render(): ComponentChild {
        return h(Fragment, null);
    }

    componentWillUnmount() {
        this.propsStream.complete();
        this.updates.complete();
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions.length = 0;
    }
}

export interface ComponentFunctionApi<P> {
    props: BehaviorSubject<P>;
    updates: Subject<P>;
    subscribe: (obs: Observable<any>) => void;
}

export type ComponentFunction<P, S> = (
    api: ComponentFunctionApi<P>,
) => Observable<S>;

export type ComponentTemplate<S> = (state: S) => ComponentChild;

const createComponentAPI = <P, S>(
    component: BasedrumComponent<P, S>,
): ComponentFunctionApi<P> => ({
    props: component.propsStream,
    subscribe: (obs: Observable<unknown>) =>
        component.subscriptions.push(obs.subscribe()),
    updates: component.updates,
});

export const createComponent = <P, S>(
    componentFunction: ComponentFunction<P, S>,
    template: ComponentTemplate<S>,
) =>
    class extends BasedrumComponent<P, S> {
        createSubscription(): Subscription {
            let hasEmitted = false;
            const subscription = componentFunction(createComponentAPI(this))
                .pipe(distinctUntilChanged(shallowEqual))
                .subscribe(state => {
                    hasEmitted = true;
                    this.setState(state);
                });

            if (!hasEmitted) {
                throw new Error(
                    'Your Component did not emit any state when it was created. ' +
                        'Make sure the Observable you return from your ' +
                        'component function emits immediately.',
                );
            }
            return subscription;
        }
        render(): ComponentChild {
            return template(this.state);
        }
    };
