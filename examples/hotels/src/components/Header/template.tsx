import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';

export interface State {
    label: string;
}

export const Template: ComponentTemplate<State> = ({ label }) => (
    <header className={styles.container}>{label}</header>
);
