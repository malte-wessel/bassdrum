import {
    createComponent,
    ComponentFunction,
    combine,
    createHandler,
    MouseEvent,
} from 'bassdrum';
import { combineLatest } from 'rxjs';
import { pluck, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { bookmarksStore } from '../../stores/bookmarks';
import { mapToLatestFrom } from '../../util/mapToLatestFrom';
import { Template, State } from './template';

export interface Props {
    accommodationId: number;
    className?: string;
}

const bookmarksbyAccommodationId = bookmarksStore.state.pipe(
    pluck('byAccommodationId'),
    distinctUntilChanged(),
);

const ComponentFn: ComponentFunction<Props, State> = ({ props, subscribe }) => {
    const accommodationId = props.pipe(
        pluck('accommodationId'),
        distinctUntilChanged(),
    );

    const bookmark = combineLatest(
        accommodationId,
        bookmarksbyAccommodationId,
    ).pipe(map(([id, byId]) => byId[id]));

    const [handleToggle, toggles] = createHandler<MouseEvent>();

    subscribe(
        toggles.pipe(
            mapToLatestFrom(accommodationId),
            tap(bookmarksStore.toggle),
        ),
    );

    return combine(props, {
        handleToggle,
        bookmark,
    });
};

export default createComponent(ComponentFn, Template);
