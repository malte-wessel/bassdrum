import { h } from 'preact';
import { ComponentTemplate, Handler } from 'bassdrum';
import cn from 'classnames';
import styles from './styles.scss';
import { Accommodation } from '../../stores/accommodations';
import AccommodationItem from '../AccommodationItem';
import Pagination from './Pagination';

export interface State {
    accommodations: Accommodation[] | null;
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
    isLoading: boolean;
    className?: string;
}

export const Template: ComponentTemplate<State> = ({
    accommodations,
    className,
    handlePageChange,
    currentPage,
    numberOfPages,
    isLoading,
}) => (
    <main className={cn(styles.container, className)}>
        {accommodations && (
            <ul className={styles.list}>
                {accommodations.map(accommodation => (
                    <li className={styles.item} key={accommodation.id}>
                        <AccommodationItem accommodation={accommodation} />
                    </li>
                ))}
            </ul>
        )}
        <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            disabled={isLoading}
        ></Pagination>
    </main>
);
