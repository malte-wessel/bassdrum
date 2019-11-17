import { Subject } from 'rxjs';

export const createHandler = <E>() => {
    const subject = new Subject<E>();
    const handleEvent = (event: E) => subject.next(event);
    return [handleEvent, subject] as const;
};
