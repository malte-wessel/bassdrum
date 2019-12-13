import cn from 'classnames';
import { h, ComponentChild, JSX } from 'preact';
import { ComponentTemplate } from 'bassdrum';
import styles from './styles.scss';

export type State = {
    children: ComponentChild;
    className?: string;
} & JSX.HTMLAttributes<HTMLButtonElement>;

export const Template: ComponentTemplate<State> = ({
    className,
    children,
    ...attrs
}) => (
    <button type="button" className={cn(styles.button, className)} {...attrs}>
        {children}
    </button>
);
