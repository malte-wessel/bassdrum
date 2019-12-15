import { RefCallback } from 'preact';
import { BehaviorSubject } from 'rxjs';

/**
 * Creates a ref function and a BehaviourSubject that emits the referenced element
 */
export const createRef = <T extends HTMLElement>() => {
    const subject = new BehaviorSubject<T | null>(null);
    const ref: RefCallback<T> = el => {
        subject.next(el);
    };
    return [ref, subject] as const;
};
