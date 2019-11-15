import { isObservable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mergeIntoObject } from './mergeIntoObject';

interface MergeObjectDictionary {
    [key: string]: any;
}

export function mergeObject(dictionary: MergeObjectDictionary) {
    const observables = Object.keys(dictionary).map(key => {
        const value = dictionary[key];
        if (isObservable(value)) {
            return value.pipe(
                map(val => ({
                    [key]: val,
                })),
            );
        }
        return of({
            [key]: value,
        });
    });
    return mergeIntoObject(...observables);
}
