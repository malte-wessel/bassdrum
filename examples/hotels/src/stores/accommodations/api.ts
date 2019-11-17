import { data } from './data';
import random from 'lodash/random';
import { AccommodationParams, AccommodationData } from './';

const get = ({
    limit,
    offset,
}: AccommodationParams): Promise<AccommodationData> =>
    new Promise(resolve => {
        setTimeout(
            () =>
                resolve({
                    limit,
                    offset,
                    count: data.length,
                    accommodations: data.slice(offset, offset + limit),
                }),
            random(1000),
        );
    });

export const api = {
    get,
};
