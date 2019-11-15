import toPairs from 'lodash/toPairs';
import { isObservable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mergeIntoObject } from './mergeIntoObject';

interface MergeObjectDictionary {
    [key: string]: any;
}

export function mergeObject(dictionary: MergeObjectDictionary) {
    const pairs = toPairs(dictionary);
    const observables = pairs.map(([key, value]) => {
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
