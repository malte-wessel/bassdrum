import { createComponent, ComponentFunction, Handler } from 'bassdrum';
import { Template, State } from './template';
import { Hotel } from '../../stores/hotels';

interface Props {
    hotels: Hotel[] | null;
    handlePageChange: Handler<number>;
    currentPage: number;
    numberOfPages: number;
    isLoading: boolean;
    className?: string;
}

const ComponentFn: ComponentFunction<Props, State> = ({ props }) => props;

export default createComponent(ComponentFn, Template);
