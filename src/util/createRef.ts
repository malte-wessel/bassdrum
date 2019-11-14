import { RefCallback } from 'preact';
import { Subject } from 'rxjs';

export const createRef = <T extends HTMLElement>() => {
    const subject = new Subject<T>();
    const ref: RefCallback<T> = el => {
        if (el) {
            subject.next(el as T);
        }
    };
    return [ref, subject] as const;
};
