import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';

export interface State {
    title: string;
}

export const Template: ComponentTemplate<State> = ({ title }) => (
    <div>
        <h2 className={styles.title}>{title}</h2>
    </div>
);
