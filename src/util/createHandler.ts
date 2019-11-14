import { JSX } from 'preact';
import { Subject } from 'rxjs';

export const createHandler = <T extends JSX.TargetedEvent>() => {
    const subject = new Subject<T>();
    const handleEvent: JSX.EventHandler<T> = (event: T) =>
        subject.next(event);
    return [handleEvent, subject] as const;
};
