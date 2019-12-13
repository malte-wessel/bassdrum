import cn from 'classnames';
import { h } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';

export interface State {
    title: string;
    className?: string;
}

export const Template: ComponentTemplate<State> = ({ title, className }) => (
    <h2 className={cn(styles.title, className)}>{title}</h2>
);
