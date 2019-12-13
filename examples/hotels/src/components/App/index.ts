import {
    createComponent,
    ComponentFunction,
    combine,
    createHandler,
} from 'bassdrum';
import { tap, map, startWith } from 'rxjs/operators';
import { Template, State } from './template';
import { accommodationsStore } from '../../stores/accommodations';

interface Props {}

const itemsPerPage = 10;

const ComponentFn: ComponentFunction<Props, State> = ({ props, subscribe }) => {
    const [handlePageChange, pageChanges] = createHandler<number>();
    const currentPage = pageChanges.pipe(startWith(0));

    const params = currentPage.pipe(
        map(n => ({ offset: n * itemsPerPage, limit: itemsPerPage })),
    );

    subscribe(params.pipe(tap(accommodationsStore.load)));

    const accommodationData = accommodationsStore.state.pipe(
        map(({ isLoading, data }) => ({
            isLoading,
            accommodations: data ? data.accommodations : null,
            numberOfPages: data ? Math.ceil(data.count / itemsPerPage) : 0,
        })),
    );

    return combine(props, accommodationData, { currentPage, handlePageChange });
};

export default createComponent(ComponentFn, Template);
