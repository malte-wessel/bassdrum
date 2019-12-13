import { createComponent, ComponentFunction, Handler } from 'bassdrum';
import { Template, State } from './template';
import { Hotel } from '../../stores/hotels';
import { pairwise, filter, tap, pluck } from 'rxjs/operators';

interface Props {
    hotels: Hotel[] | null;
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
    isLoading: boolean;
    className?: string;
}

const scrollTop = () => window.scrollTo({ top: 0 });

const ComponentFn: ComponentFunction<Props, State> = ({
    props,
    updates,
    subscribe,
}) => {
    // Scroll top when page changes
    subscribe(
        updates.pipe(
            pluck('currentPage'),
            pairwise(),
            filter(([prev, next]) => prev !== next),
            tap(scrollTop),
        ),
    );
    return props;
};

export default createComponent(ComponentFn, Template);
