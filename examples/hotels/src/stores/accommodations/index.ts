import { createRestStore } from '../../util/createRestStore';
import { api } from './api';

export interface Accommodation {
    id: number;
    name: string;
    type: string;
    image: string;
    rating: number;
    reviewCount: number;
    category: number;
    price: number;
}

export interface AccommodationParams {
    limit: number;
    offset: number;
}

export interface AccommodationData {
    limit: number;
    offset: number;
    count: number;
    accommodations: Accommodation[];
}

export const store = createRestStore<AccommodationParams, AccommodationData>(
    api,
);
