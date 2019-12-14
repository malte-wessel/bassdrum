import { h } from 'preact';
import { ComponentTemplate, Handler } from 'bassdrum';
import cn from 'classnames';

import { Hotel } from '../../stores/hotels';

import HotelItem from './HotelItem';
import Pagination from './Pagination';
import styles from './styles.scss';

export interface State {
    hotels: Hotel[] | null;
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
    isLoading: boolean;
    className?: string;
}

export const Template: ComponentTemplate<State> = ({
    hotels,
    className,
    handlePageChange,
    currentPage,
    numberOfPages,
    isLoading,
}) => (
    <main
        className={cn(
            styles.container,
            isLoading && styles.isLoading,
            className,
        )}
    >
        {hotels && (
            <ul className={styles.list}>
                {hotels.map(hotel => (
                    <li className={styles.item} key={hotel.id}>
                        <HotelItem hotel={hotel} />
                    </li>
                ))}
            </ul>
        )}
        <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            disabled={isLoading}
        />
    </main>
);
