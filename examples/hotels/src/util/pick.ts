import p from 'lodash/pick';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
export const pick = (keys: Array<string>) => pipe(map(value => p(value, keys)));
