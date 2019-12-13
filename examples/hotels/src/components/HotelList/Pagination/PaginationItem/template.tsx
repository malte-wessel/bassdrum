import { h } from 'preact';
import { ComponentTemplate, Handler, MouseEvent } from 'bassdrum';
import Button from '../../../Button';
import styles from './styles.scss';

export interface State {
    n: number;
    handleClick: Handler<MouseEvent>;
    disabled: boolean;
}

export const Template: ComponentTemplate<State> = ({
    handleClick,
    n,
    disabled,
}) => (
    <Button disabled={disabled} onClick={handleClick} className={styles.button}>
        {n}
    </Button>
);
