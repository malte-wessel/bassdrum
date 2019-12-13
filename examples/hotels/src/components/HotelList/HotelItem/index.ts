import {
    createRef,
    createComponent,
    ComponentFunction,
    combine,
} from 'bassdrum';
import { combineLatest } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { Hotel } from '../../../stores/hotels';
import { mapToIsIntersecting } from '../../../util/mapToIsIntersecting';
import { Template, State } from './template';

interface Props {
    hotel: Hotel;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props, updates }) => {
    const [rootRef, rootEl] = createRef<HTMLElement>();
    const mounted = updates.pipe(first());

    const isVisible = combineLatest(rootEl, mounted).pipe(
        map(([el]) => el),
        mapToIsIntersecting(),
        startWith(false),
    );

    return combine(props, { rootRef, isVisible });
};

export default createComponent(ComponentFn, Template);
