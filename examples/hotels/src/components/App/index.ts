import {
    createComponent,
    ComponentFunction,
    combine,
    createHandler,
} from 'bassdrum';
import { Template, State } from './template';
import { store as accommodationsStore } from '../../stores/accommodations';
import { map, startWith } from 'rxjs/operators';

interface Props {}

const itemsPerPage = 10;

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => {
    const [handlePageChange, pageChanges] = createHandler<number>();
    const currentPage = pageChanges.pipe(startWith(0));

    const params = currentPage.pipe(
        map(n => ({ offset: n * itemsPerPage, limit: itemsPerPage })),
    );

    const accommodationData = accommodationsStore(params).pipe(
        map(({ isLoading, data }) => ({
            isLoading,
            accommodations: data ? data.accommodations : null,
            numberOfPages: data ? Math.ceil(data.count / itemsPerPage) : 0,
        })),
    );

    return combine(props, accommodationData, { currentPage, handlePageChange });
};

export default createComponent(ComponentFn, Template);
