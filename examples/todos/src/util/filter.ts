import { filter } from 'rxjs/operators';

const isNotNullOrUndefined = <T>(input: null | undefined | T): input is T =>
    input !== null && input !== undefined;

export const filterNotNil = () => filter(isNotNullOrUndefined);

const isTruthy = <T>(
    input: null | undefined | 0 | '' | false | T,
): input is T => !!input;

export const filterTruthy = () => filter(isTruthy);
