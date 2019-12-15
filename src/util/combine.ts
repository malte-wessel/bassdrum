import { isObservable, Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnfoldObservable, Dictionary } from '../types/util';

type ObservableOrDictionary = Observable<any> | Dictionary<any>;

export function combine<T1>(t1: T1): Observable<UnfoldObservable<T1>>;
export function combine<T1, T2>(
    t1: T1,
    t2: T2,
): Observable<UnfoldObservable<T1> & UnfoldObservable<T2>>;
export function combine<T1, T2, T3>(
    t1: T1,
    t2: T2,
    t3: T3,
): Observable<
    UnfoldObservable<T1> & UnfoldObservable<T2> & UnfoldObservable<T3>
>;
export function combine<T1, T2, T3, T4>(
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4,
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
    t5: T5,
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
    t6: T6,
): Observable<
    UnfoldObservable<T1> &
        UnfoldObservable<T2> &
        UnfoldObservable<T3> &
        UnfoldObservable<T4> &
        UnfoldObservable<T5> &
        UnfoldObservable<T6>
>;
/**
 * `combine` merges data from Observables and plain objects that hold primitive values or Observables. The returned Observable emits whenever one of its input Observables emits.
 * @param streams
 */
export function combine(...streams: ObservableOrDictionary[]) {
    const sources = [];
    for (let i = 0, l = streams.length; i < l; i++) {
        const stream = streams[i];
        if (isObservable(stream)) {
            sources.push(stream);
        } else {
            for (const key in stream) {
                const value = stream[key];
                sources.push(
                    isObservable(value)
                        ? value.pipe(
                              map(value => ({
                                  [key]: value,
                              })),
                          )
                        : of({
                              [key]: value,
                          }),
                );
            }
        }
    }
    return combineLatest(...sources).pipe(
        map(values => Object.assign({}, ...values)),
    );
}
