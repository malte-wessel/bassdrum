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
    hotelId: number;
    className?: string;
}

const bookmarksbyHotelId = bookmarksStore.state.pipe(
    pluck('byHotelId'),
    distinctUntilChanged(),
);

const ComponentFn: ComponentFunction<Props, State> = ({ props, subscribe }) => {
    const hotelId = props.pipe(pluck('hotelId'), distinctUntilChanged());

    const bookmark = combineLatest(hotelId, bookmarksbyHotelId).pipe(
        map(([id, byId]) => byId[id]),
    );

    const [handleToggle, toggles] = createHandler<MouseEvent>();

    subscribe(
        toggles.pipe(mapToLatestFrom(hotelId), tap(bookmarksStore.toggle)),
    );

    return combine(props, {
        handleToggle,
        bookmark,
    });
};

export default createComponent(ComponentFn, Template);
