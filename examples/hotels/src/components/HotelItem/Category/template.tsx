import times from 'lodash/times';
import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';

export interface State {
    category: number;
    className?: string;
}

export const Template: ComponentTemplate<State> = ({ category, className }) => (
    <div className={className}>
        <span className={styles.stars}>{times(category, () => '⭐')}</span>{' '}
        Hotel
    </div>
);
