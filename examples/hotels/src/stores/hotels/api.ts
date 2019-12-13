import { data } from './data';
import random from 'lodash/random';
import { HotelParams, HotelData } from './';

const get = ({ limit, offset }: HotelParams): Promise<HotelData> =>
    new Promise(resolve => {
        setTimeout(
            () =>
                resolve({
                    limit,
                    offset,
                    count: data.length,
                    hotels: data.slice(offset, offset + limit),
                }),
            random(500, 1000),
        );
    });

export const api = {
    get,
};
