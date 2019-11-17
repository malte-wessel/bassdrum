import { h } from 'preact';
import { ComponentTemplate, Handler } from 'bassdrum';
import Header from '../Header';
import AccommodationList from '../AccommodationList';
import { Accommodation } from '../../stores/accommodations';
import styles from './styles.scss';

export interface State {
    isLoading: boolean;
    accommodations: Accommodation[] | null;
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
}

export const Template: ComponentTemplate<State> = ({
    accommodations,
    handlePageChange,
    currentPage,
    numberOfPages,
    isLoading,
}) => (
    <div>
        <Header label="accommodations" />
        <AccommodationList
            className={styles.list}
            accommodations={accommodations}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            isLoading={isLoading}
        />
    </div>
);
