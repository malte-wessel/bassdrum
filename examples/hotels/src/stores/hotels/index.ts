import { createRestStore } from '../../util/createRestStore';
import { api } from './api';

export interface Hotel {
    id: number;
    name: string;
    type: string;
    image: string;
    rating: number;
    reviewCount: number;
    category: number;
    price: number;
}

export interface HotelParams {
    limit: number;
    offset: number;
}

export interface HotelData {
    limit: number;
    offset: number;
    count: number;
    hotels: Hotel[];
}

export const hotelsStore = createRestStore<HotelParams, HotelData>(api);
