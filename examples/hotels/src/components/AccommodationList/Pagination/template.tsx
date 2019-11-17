import { h } from 'preact';
import times from 'lodash/times';
import { ComponentTemplate, Handler } from 'bassdrum';
import styles from './styles.scss';
import PaginationItem from './PaginationItem';

export interface State {
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
    disabled: boolean;
}

export const Template: ComponentTemplate<State> = ({
    numberOfPages,
    handlePageChange,
    currentPage,
    disabled,
}) => (
    <ul className={styles.container}>
        {times(numberOfPages, n => (
            <PaginationItem
                key={n}
                n={n}
                active={n === currentPage}
                disabled={disabled}
                handlePageChange={handlePageChange}
            />
        ))}
    </ul>
);
