import { h } from 'preact';
import { ComponentTemplate, Handler } from 'bassdrum';
import Header from '../Header';
import HotelList from '../HotelList';
import { Hotel } from '../../stores/hotels';
import styles from './styles.scss';

export interface State {
    isLoading: boolean;
    hotels: Hotel[] | null;
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
}

export const Template: ComponentTemplate<State> = ({
    hotels,
    handlePageChange,
    currentPage,
    numberOfPages,
    isLoading,
}) => (
    <div>
        <Header label="🏨 Awesome Hotels" />
        <h2 className={styles.claim}>
            {isLoading
                ? '⌛ Loading awesome hotels...'
                : 'Find awesome hotels in San Francisco!'}
        </h2>
        <HotelList
            className={styles.list}
            hotels={hotels}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            isLoading={isLoading}
        />
    </div>
);
