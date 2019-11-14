import { isObservable, Observable } from 'rxjs';
import { UnfoldObservable } from '../types/util';
import { mergeIntoObject } from './mergeIntoObject';
import { mergeObject } from './mergeObject';

type ObservableOrObject = Observable<any> | object;

export function combine<T1>(t1: T1): Observable<UnfoldObservable<T1>>;
export function combine<T1, T2>(
    t1: T1,
    t2: T2
): Observable<UnfoldObservable<T1> & UnfoldObservable<T2>>;
export function combine<T1, T2, T3>(
    t1: T1,
    t2: T2,
    t3: T3
): Observable<
    UnfoldObservable<T1> & UnfoldObservable<T2> & UnfoldObservable<T3>
>;
export function combine<T1, T2, T3, T4>(
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4
): Observable<
    UnfoldObservable<T1> &
        UnfoldObservable<T2> &
        UnfoldObservable<T3> &
        UnfoldObservable<T4>
>;
export function combine<T1, T2, T3, T4, T5>(
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4,
    t5: T5
): Observable<
    UnfoldObservable<T1> &
        UnfoldObservable<T2> &
        UnfoldObservable<T3> &
        UnfoldObservable<T4> &
        UnfoldObservable<T5>
>;
export function combine<T1, T2, T3, T4, T5, T6>(
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4,
    t5: T5,
    t6: T6
): Observable<
    UnfoldObservable<T1> &
        UnfoldObservable<T2> &
        UnfoldObservable<T3> &
        UnfoldObservable<T4> &
        UnfoldObservable<T5> &
        UnfoldObservable<T6>
>;
export function combine(...streams: ObservableOrObject[]) {
    return mergeIntoObject(
        ...streams.map(stream =>
            isObservable(stream) ? stream : mergeObject(stream)
        )
    );
}
