import { Handler } from 'bassdrum';
import { Observable, Observer } from 'rxjs';

export const bindHandler = <A>(
    handler: Observable<Handler<A>>,
    arg: Observable<A>,
) =>
    new Observable((observer: Observer<Handler<any>>) => {
        let fn: Handler<A>;
        let value: A;

        const handlerSubscription = handler.subscribe({
            next: handler => {
                fn = handler;
            },
            error: err => observer.error(err),
            complete: () => observer.complete(),
        });

        const argSubscription = arg.subscribe({
            next: arg => {
                value = arg;
            },
            error: err => observer.error(err),
            complete: () => observer.complete(),
        });

        const bound = () => fn(value);
        observer.next(bound);

        return () => {
            handlerSubscription.unsubscribe();
            argSubscription.unsubscribe();
        };
    });
