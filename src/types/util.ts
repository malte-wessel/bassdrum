import { Observable } from 'rxjs';

export type UnfoldObservablesFromObject<T> = {
    [K in keyof T]: T[K] extends Observable<infer U> ? U : T[K];
};

export type UnfoldObservable<T> = T extends Observable<infer U>
    ? U
    : UnfoldObservablesFromObject<T>;

export type Dictionary<T> = {
    [key: string]: T;
};
