import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';

export interface State {
    url: string;
}

export const Template: ComponentTemplate<State> = ({ url }) => (
    <img className={styles.image} src={url} />
);
