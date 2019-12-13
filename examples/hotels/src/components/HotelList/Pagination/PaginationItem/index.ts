import {
    createComponent,
    ComponentFunction,
    createHandler,
    combine,
    MouseEvent,
} from 'bassdrum';
import { Template, State } from './template';
import { tap } from 'rxjs/operators';
import { mapToLatestFrom } from '../../../../util/mapToLatestFrom';

interface Props {
    n: number;
    active: boolean;
    disabled: boolean;
    handlePageChange: Function;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props, subscribe }) => {
    const [handleClick, clicks] = createHandler<MouseEvent>();

    subscribe(
        clicks.pipe(
            mapToLatestFrom(props),
            tap(({ n, handlePageChange }) => handlePageChange(n)),
        ),
    );

    return combine(props, {
        handleClick,
    });
};

export default createComponent(ComponentFn, Template);
