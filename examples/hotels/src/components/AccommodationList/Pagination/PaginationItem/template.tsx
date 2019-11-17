import { h } from 'preact';
import { ComponentTemplate, Handler, MouseEvent } from 'bassdrum';
// import styles from './styles.scss';

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
    <button type="button" disabled={disabled} onClick={handleClick}>
        {n}
    </button>
);
