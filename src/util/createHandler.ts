import { Subject } from 'rxjs';

/**
 * Creates a handler function and a subject that emits when the handler is called
 */
export const createHandler = <E>() => {
    const subject = new Subject<E>();
    const handleEvent = (event: E) => subject.next(event);
    return [handleEvent, subject] as const;
};
